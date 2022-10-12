export interface IUserData {
  name: string;
  email: string;
}

export interface AuthenticatedUser {
  token: string;
  user: IUserData;
}

export interface IAuthenticateUserRequest {
  email: string;
  password: string;
}
