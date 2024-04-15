interface IUser {
  email: string;
  organisation: string;
  username: string;
  is_student: boolean;
  is_tutor: boolean;
  is_manager: boolean;
}

interface IUserTokens {
  refresh: string;
  access: string;
}
