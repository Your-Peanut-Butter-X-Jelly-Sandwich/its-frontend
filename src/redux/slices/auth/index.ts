import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux';

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    email: '',
    is_manager: false,
    is_student: false,
    is_tutor: false,
    username: '',
    organisation: '',
  },
  tokens: {
    access: '',
    refresh: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSuccess: (state, { payload }: PayloadAction<AuthLoginResponse>) => {
      state.isAuthenticated = true;
      state.user = payload.user;
      state.tokens = payload.tokens;
    },
    setAuthTokens: (state, { payload }: PayloadAction<IUserTokens>) => {
      state.tokens.access = payload.access;
      state.tokens.refresh = payload.refresh;
      state.isAuthenticated = true;
    },
    setAuthUser: (state, { payload }: PayloadAction<AuthRetrieveUserResponse>) => {
      state.user = payload;
      state.isAuthenticated = true;
    },
    setLogout: () => initialState,
  },
});

export const { setAuthSuccess, setAuthTokens, setAuthUser, setLogout } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
