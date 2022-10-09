import { useContext } from 'react';
import AuthContext, { AuthContextData } from '../../contexts/auth';

const useAuth = (): AuthContextData => {
  const context = useContext<AuthContextData>(AuthContext);

  return context;
};

export default useAuth;
