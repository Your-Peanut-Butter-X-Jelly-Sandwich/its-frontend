import { ITSApi } from '@/redux/createApi';
import { setAuthSuccess, setAuthTokens, setAuthUser, setLogout } from '@/redux/slices/auth';
import { isEmpty } from 'lodash';

export const authApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    authSignup: builder.query<AuthSignUpResponse, AuthSignUpRequest>({
      query: (params) => ({
        url: '/auth/signup',
        method: 'POST',
        body: params,
      }),
    }),
    authLogin: builder.query<AuthLoginResponse, AuthLoginRequest>({
      query: (params) => ({
        url: '/auth/login',
        method: 'POST',
        body: params,
      }),
      async onQueryStarted(_record, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (!isEmpty(data)) {
          dispatch(setAuthSuccess(data));
        }
      },
    }),
    authLogout: builder.query<AuthLogoutResponse, AuthLogoutRequest>({
      query: (params) => ({
        url: 'auth/logout',
        method: 'POST',
        body: params,
      }),
      async onQueryStarted(_record, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        if (!isEmpty(res)) {
          dispatch(setLogout());
        }
      },
    }),
    authRetrieveUser: builder.query<AuthRetrieveUserResponse, void>({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),
      async onQueryStarted(_record, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (!isEmpty(data)) {
          dispatch(setAuthUser(data));
        }
      },
    }),
    authUpdatePersonalInfo: builder.mutation<AuthUpdateUserResponse, AuthUpdateUserRequest>({
      query: (params) => ({
        url: 'auth/update-info',
        method: 'PATCH',
        body: params,
      }),
      async onQueryStarted(_record, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (!isEmpty(data)) {
          dispatch(setAuthUser(data));
        }
      },
    }),
  }),
});

export const {
  useLazyAuthLoginQuery,
  useLazyAuthSignupQuery,
  useLazyAuthLogoutQuery,
  useLazyAuthRetrieveUserQuery,
  useAuthUpdatePersonalInfoMutation,
} = authApi;
