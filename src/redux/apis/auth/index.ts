import { ITSApi } from '@/redux/createApi';
import { setAuthSuccess, setAuthTokens, setAuthUser } from '@/redux/slices/auth';
import { isEmpty } from 'lodash';

export const authApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    authSignup: builder.query<IAuthSignUpResponse, IAuthSignUpRequest>({
      query: (params) => ({
        url: '/auth/signup',
        method: 'POST',
        body: params,
      }),
    }),
    authLogin: builder.query<IAuthLoginResponse, IAuthLoginRequest>({
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
    authLogout: builder.query<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'GET',
      }),
      async onQueryStarted(_record, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        if (!isEmpty(res)) {
          dispatch(setAuthTokens({ access: '', refresh: '' }));
        }
      },
    }),
    authRetrieveUser: builder.query<IAuthRetrieveUserResponse, void>({
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
    authUpdatePersonalInfo: builder.mutation<IAuthUpdateUserResponse, IAuthUpdateUserRequest>({
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
