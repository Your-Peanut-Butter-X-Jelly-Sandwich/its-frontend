import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux';

const initialState: IAuthState = {
  isAuthenticated: false,
  user: {
    // NOTE: just for demo, will change to empty string on production
    email: 'some_fake_email@fake.com',
    is_manager: false,
    is_student: true,
    is_tutor: false,
    username: 'emrys',
    organisation: 'NUS',
  },
  tokens: {
    access:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwODM2MDIyLCJpYXQiOjE3MTA3NDk2MjIsImp0aSI6Ijg2ZmRjZjgwZTZjYzQyNThiOTEwZmM0ZTQ2YzlmODhiIiwidXNlcl9pZCI6MX0.i_ohPw8rBmm47K3910QrUG6pQESH3p6HvNdO_lPuXZU',
    refresh:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMTM1NDQyMiwiaWF0IjoxNzEwNzQ5NjIyLCJqdGkiOiI4YmVmODIyNjZkYzU0ZDQwODNiNjQxNjkwNzMyOGJjMyIsInVzZXJfaWQiOjF9.UHrYKsmJEglMmA_I0a4hvF2rWmuv0IdwLCQXt-y9NxQ',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSuccess: (state, { payload }: PayloadAction<IAuthLoginResponse>) => {
      state.isAuthenticated = true;
      state.user = payload.user;
      state.tokens = payload.tokens;
    },
    setAuthTokens: (state, { payload }: PayloadAction<IUserTokens>) => {
      state.tokens.access = payload.access;
      state.tokens.refresh = payload.refresh;
      state.isAuthenticated = true;
    },
    setAuthUser: (state, { payload }: PayloadAction<IAuthRetrieveUserResponse>) => {
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    setLogout: () => initialState,
  },
});

export const { setAuthSuccess, setAuthTokens, setAuthUser, setLogout } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
