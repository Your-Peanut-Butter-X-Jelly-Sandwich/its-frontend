interface IAuthState {
  isAuthenticated: boolean;
  user: Partial<IUser>;
  tokens: IUserTokens;
}

interface IAuthLoginRequest {
  email: string;
  password: string;
}

interface IAuthLoginResponse {
  user: IUser;
  tokens: IUserTokens;
}

interface IAuthSignUpRequest extends IUser {
  password: string;
}

interface IAuthSignUpResponse extends IAuthSignUpRequest {}
