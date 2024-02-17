import { itsApi } from "@/redux/createApi";
import { setAuthSuccess } from "@/redux/slices/auth";
import { isEmpty } from "lodash";
export const authApi = itsApi.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.query<IAuthLoginResponse, IAuthLoginRequest>({
      query: (params) => ({
        url: "/auth/login",
        method: "POST",
        body: params,
      }),
      async onQueryStarted(_record, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (!isEmpty(data)) {
          dispatch(setAuthSuccess(data));
        }
      },
    }),
    // TODO: Add authSignup, authLogout, authDeleteAccount, authSetNewPassword, authForgetPassword services
  }),
});
