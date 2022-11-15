export interface IUserData {
  name: string;
  email: string;
}

export interface AuthenticatedUser {
  token: string;
  user: IUserData;
}

export interface PublicUser {
  code: string;
}

export interface IAuthenticateUserRequest {
  email: string;
  password: string;
}
