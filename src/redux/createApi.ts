import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { HOST_API } from '@/configs/env';
import { RootState } from '.';
import { Mutex } from 'async-mutex';
import { isEmpty } from 'lodash';
import { setAuthTokens, setLogout } from './slices/auth';
import { access } from 'fs';

const mutex = new Mutex();

const baseQueryWithAuth = () =>
  fetchBaseQuery({
    baseUrl: `${HOST_API}/`,
    prepareHeaders: (headers, { getState }) => {
      const { tokens } = (getState() as RootState).auth;
      if (tokens.access) {
        headers.set('Authorization', `Bearer ${tokens.access}`);
      }
    },
  });

const plainBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: `${HOST_API}/`,
  });

const itsBaseQueryWithReauth: BaseQueryFn<any | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  // retrieve the role of the current user, which is used to construct the base query url
  // send query
  let result = await baseQueryWithAuth()(args, api, extraOptions);

  /* When user tries to access data that requires authentication */
  // If encountering 401 Unauthorized error, an additional request is sent to attempt to refresh an authorization token,
  // and re-try the initial query after re-authorizing.
  if (result.error && result.error.status === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        /* A call to the refresh token endpoint to get a new access token. (Refresh to get new access token) */

        // Retrieve the current refresh token from redux
        const { tokens } = (api.getState() as RootState).auth;
        const refreshToken = tokens.refresh;
        // Request new access token with refresh token
        const { data, error } = await plainBaseQuery()(
          {
            url: '/auth/token/refresh',
            method: 'POST',
            body: {
              refresh: refreshToken,
            },
          },
          api,
          extraOptions
        );
        // When refresh token has also expired, reload (reload will trigger redirection to login page)
        if (error) {
          api.dispatch(setLogout());
          window.location.reload();
        }
        // If the request is successful, update the redux store with the new access token and retry the initial query.
        if (!isEmpty(data)) {
          // Get the new access and refresh tokens from the response
          const { access: newAccessToken } = data as { access: string };
          // Update redux with the new tokens
          api.dispatch(setAuthTokens({ access: newAccessToken, refresh: refreshToken }));
          // retry the initial query
          result = await baseQueryWithAuth()(args, api, extraOptions);
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
      result = await baseQueryWithAuth()(args, api, extraOptions);
    }
  }
  return result;
};

export const ITSApi = createApi({
  reducerPath: 'ITSApi',
  baseQuery: itsBaseQueryWithReauth,
  endpoints: () => ({}),
});
