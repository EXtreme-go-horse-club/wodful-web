import { createContext, useCallback, useEffect, useState } from 'react';
import { AxiosAdapter } from '../../adapters/AxiosAdapter';
import { AuthenticateService } from '../../services/Authenticate';

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextData {
  signed: boolean;
  user: IUserData | null;
  Login({ username, password }: IAuthenticateRequest): Promise<void>;
  Logout(): void;
}

interface IUserData {
  name: string;
  email: string;
}

interface AuthenticatedUserData {
  token: string;
  user: IUserData;
}

interface IAuthenticateRequest {
  username: string;
  password: string;
}

const AuthContext = createContext({} as AuthContextData);

const axios = new AxiosAdapter();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUserData | null>(null);

  const Login = useCallback(async ({ username, password }: IAuthenticateRequest) => {
    await new AuthenticateService(axios)
      .login(username, password)
      .then((userData: AuthenticatedUserData) => {
        setUser(userData.user);

        localStorage.setItem('@Wodful:usr', JSON.stringify(userData.user));
        localStorage.setItem('@Wodful:tkn', userData.token);
      });
  }, []);

  const Logout = useCallback(() => {
    setUser(null);

    localStorage.removeItem('@Wodful:usr');
    localStorage.removeItem('@Wodful:tkn');
  }, []);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@Wodful:usr');
    const storagedToken = localStorage.getItem('@Wodful:tkn');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
