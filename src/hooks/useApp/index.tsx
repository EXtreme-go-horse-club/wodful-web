import AppContext, { AppContextProps } from '@/contexts/app';
import { useContext } from 'react';

const useApp = (): AppContextProps => {
  const context = useContext<AppContextProps>(AppContext);

  return context;
};

export default useApp;
