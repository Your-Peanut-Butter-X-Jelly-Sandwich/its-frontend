interface IAuthState {
  isAuthenticated: boolean;
  user: IUser;
  tokens: IUserTokens;
}

interface IAuthLoginRequest {
  email: string;
  password: string;
}

interface IAuthLoginResponse {
  tokens: IUserTokens;
  user: IUser;
}
interface IAuthSignUpRequest extends IAuthLoginRequest {}

interface IAuthSocialSignUpRequest {
  provider: string;
}

interface IAuthSignUpResponse {
  user: IUser;
}

interface IAuthRetrieveUserResponse extends IUser {}

interface IAuthUpdateUserRequest {
  organisation?: string;
  username?: string;
}

interface IAuthUpdateUserResponse extends IUser {}

interface IAuthLogoutRequest {
  tokens: IUserTokens;
}

interface IAuthLogoutResponse {
  message: string;
}
