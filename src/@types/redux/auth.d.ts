interface AuthState {
  isAuthenticated: boolean;
  user: IUser;
  tokens: IUserTokens;
}

interface AuthLoginRequest {
  email: string;
  password: string;
}

interface AuthLoginResponse {
  tokens: IUserTokens;
  user: IUser;
}
interface AuthSignUpRequest extends AuthLoginRequest {}

interface AuthSocialSignUpRequest {
  provider: string;
}

interface AuthSignUpResponse {
  user: IUser;
}

interface AuthRetrieveUserResponse extends IUser {}

interface AuthUpdateUserRequest {
  organisation?: string;
  username?: string;
}

interface AuthUpdateUserResponse extends IUser {}

interface AuthLogoutRequest {
  tokens: IUserTokens;
}

interface AuthLogoutResponse {
  message: string;
}
