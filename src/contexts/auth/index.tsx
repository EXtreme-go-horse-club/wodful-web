import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { AuthenticatedUserData, IAuthenticateUserRequest, IUserData } from '@/data/interfaces/user';
import { AuthenticateService } from '@/services/Authenticate';
import { createContext, useCallback, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextData {
  signed: boolean;
  user: IUserData | null;
  Login({ email, password }: IAuthenticateUserRequest): Promise<void>;
  Logout(): void;
}

const AuthContext = createContext({} as AuthContextData);

const axios = new AxiosAdapter();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUserData | null>(null);

  const Login = useCallback(async ({ email, password }: IAuthenticateUserRequest) => {
    await new AuthenticateService(axios)
      .login(email, password)
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
