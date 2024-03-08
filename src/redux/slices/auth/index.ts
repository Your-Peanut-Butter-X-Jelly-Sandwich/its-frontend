import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux";

const initialState: IAuthState = {
  isAuthenticated: true,
  user: {
    // NOTE: just for demo, will change to empty string on production
    email: "some_fake_email@fake.com",
    is_manager: false,
    is_student: false,
    is_tutor: true,
    username: "emrys",
    organisation: "NUS",
  },
  tokens: {
    access: "",
    refresh: "",
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
      state.tokens.access = payload.access;
      state.tokens.refresh = payload.refresh;
      state.isAuthenticated = true;
    },
    setAuthUser: (
      state,
      { payload }: PayloadAction<IAuthRetrieveUserResponse>,
    ) => {
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    setLogout: () => initialState,
  },
});

export const { setAuthSuccess, setAuthTokens, setAuthUser, setLogout } =
  authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
