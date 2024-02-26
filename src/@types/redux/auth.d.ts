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

interface IAuthSignUpResponse extends IAuthLoginResponse {}

interface IAuthRetrieveUserResponse {
  user: IUser;
}
