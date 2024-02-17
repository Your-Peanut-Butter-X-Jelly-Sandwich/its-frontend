interface IUser {
    email: string;
    profile: {
        role: "STUDENT" | "TUTOR";
        username: string;
        organisation: string;
  };
}


interface IUserTokens {
    refreshToken: string;
    accessToken: string;
}