import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux";

const initialState: IAuthState = {
  isAuthenticated: false,
  user: {
    // NOTE: just for demo, will change to empty string on production
    email: "some_fake_email@fake.com",
  },
  tokens: {
    accessToken: "",
    refreshToken: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSuccess: (state, { payload }: PayloadAction<IAuthLoginResponse>) => {
      state.isAuthenticated = true;
      state.user = payload.user;
      state.tokens = payload.tokens;
    },
    setAuthTokens: (state, { payload }: PayloadAction<IUserTokens>) => {
      state.tokens.accessToken = payload.accessToken;
      state.tokens.refreshToken = payload.refreshToken;
      state.isAuthenticated = true;
    },
    setLogout: () => initialState,
  },
});

export const { setAuthSuccess, setAuthTokens, setLogout } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
