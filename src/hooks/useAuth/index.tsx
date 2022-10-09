import AuthContext, { AuthContextData } from '@/contexts/auth';
import { useContext } from 'react';

const useAuth = (): AuthContextData => {
  const context = useContext<AuthContextData>(AuthContext);

  return context;
};

export default useAuth;
