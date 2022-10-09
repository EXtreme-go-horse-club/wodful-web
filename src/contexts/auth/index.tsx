import { AxiosResponse } from 'axios';
import { createContext, useEffect, useState } from 'react';
import wodfulAPI from '../../services';

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUserData | null>(null);

  async function Login({ username, password }: IAuthenticateRequest) {
    await wodfulAPI
      .post('/auth/', {
        username,
        password,
      })
      .then((userData: AxiosResponse<AuthenticatedUserData>) => {
        setUser(userData.data.user);
        wodfulAPI.defaults.headers.Authorization = `Bearer ${userData.data.token}`;
        localStorage.setItem('@Wodful:user', JSON.stringify(userData.data.user));
        localStorage.setItem('@Wodful:token', userData.data.token);
      })
      .finally(() => console.log(user));
  }

  function Logout() {
    setUser(null);

    localStorage.removeItem('@Wodful:user');
    localStorage.removeItem('@Wodful:token');
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem('@Wodful:user');
    const storagedToken = localStorage.getItem('@Wodful:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      wodfulAPI.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
