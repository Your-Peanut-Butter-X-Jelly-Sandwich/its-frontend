import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { HOST_API } from "@/configs/env";
import { RootState } from ".";
import { Mutex } from "async-mutex";
import { isEmpty } from "lodash";
import { setAuthTokens, setLogout } from "./slices/auth";

const mutex = new Mutex();

const dynamicBaseQueryWithAuth = (role: IUser["profile"]["role"] | "") =>
  fetchBaseQuery({
    baseUrl: `${HOST_API}/${role.toLowerCase()}`,
    prepareHeaders: (headers, { getState }) => {
      const { tokens } = (getState() as RootState).auth;
      if (tokens.accessToken) {
        headers.set("Authorization", `Bearer ${tokens.accessToken}`);
      }
    },
  });

const plainBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: `${HOST_API}/`,
  });

const itsBaseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  // retrieve the role of the current user, which is used to construct the base query url
  const role = (api.getState() as RootState).auth.user?.profile?.role || "";
  // send query
  let result = await dynamicBaseQueryWithAuth(role)(args, api, extraOptions);

  /* When user tries to access data that requires authentication */
  // If encountering 401 Unauthorized error, an additional request is sent to attempt to refresh an authorization token,
  // and re-try the initial query after re-authorizing.
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        /* A call to the refresh token endpoint to get a new access token. (Refresh to get new access token) */

        // Retrieve the current refresh token from redux
        const { tokens } = (api.getState() as RootState).auth;
        const refreshToken = tokens.refreshToken;
        // Request new access token with refresh token
        const { data } = await plainBaseQuery()(
          {
            url: "/auth/token/refresh",
            method: "POST",
            params: {
              refreshToken,
            },
          },
          api,
          extraOptions
        );
        // If the request is successful, update the redux store with the new access token and retry the initial query.
        if (!isEmpty(data)) {
          // Get the new access and refresh tokens from the response
          const { tokens: newTokens } = data as { tokens: IUserTokens };
          // Update redux with the new tokens
          api.dispatch(setAuthTokens(newTokens));
          // retry the initial query
          result = await dynamicBaseQueryWithAuth(role)(
            args,
            api,
            extraOptions
          );
        } else {
          // If the request is unsuccessful, dispatch an action to logout the user.
          api.dispatch(setLogout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await dynamicBaseQueryWithAuth(role)(args, api, extraOptions);
    }
  }
  return result;
};

export const itsApi = createApi({
  reducerPath: "itsApi",
  baseQuery: itsBaseQueryWithReauth,
  endpoints: () => ({}),
});
