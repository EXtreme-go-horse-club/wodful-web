export interface IUserData {
  name: string;
  email: string;
}

export interface AuthenticatedUserData {
  token: string;
  user: IUserData;
}

export interface IAuthenticateUserRequest {
  email: string;
  password: string;
}
