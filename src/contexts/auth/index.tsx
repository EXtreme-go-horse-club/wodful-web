import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { AuthenticatedUser, IAuthenticateUserRequest, IUserData } from '@/data/interfaces/user';
import { AuthenticateService } from '@/services/Authenticate';
import { PublicAccessService } from '@/services/PublicAccess';
import { createContext, useCallback, useEffect, useState } from 'react';
import { PublicUser } from '../../data/interfaces/user/index';

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextData {
  signed: boolean;
  user: IUserData | null;
  Login({ email, password }: IAuthenticateUserRequest): Promise<void>;
  Logout(): void;
  isLoading: boolean;
  isError: boolean;
  Access: (accessCode: string) => void;
  Reset(): void;
}

const AuthContext = createContext({} as AuthContextData);

const axios = new AxiosAdapter();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const Login = useCallback(async ({ email, password }: IAuthenticateUserRequest) => {
    setIsLoading(true);
    await new AuthenticateService(axios)
      .login({ email, password })
      .then((userData: AuthenticatedUser) => {
        setIsError(false);
        setUser(userData.user);

        localStorage.setItem('@Wodful:usr', JSON.stringify(userData.user));
        localStorage.setItem('@Wodful:tkn', userData.token);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const Logout = useCallback(() => {
    setUser(null);

    localStorage.removeItem('@Wodful:usr');
    localStorage.removeItem('@Wodful:tkn');
  }, []);

  const Access = useCallback(async (accessCode: string) => {
    setIsLoading(true);
    await new PublicAccessService(axios)
      .access(accessCode)
      .then((access: PublicUser) => {
        setIsError(false);
        localStorage.setItem('@Wodful:access', access.code);
        window.location.href = `/access/${access.code}/leaderboards`;
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const Reset = useCallback(() => {
    localStorage.removeItem('@Wodful:access');
  }, []);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@Wodful:usr');
    const storagedToken = localStorage.getItem('@Wodful:tkn');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout, isLoading, isError, Access, Reset }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
