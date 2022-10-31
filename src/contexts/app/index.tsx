import { IChampionship } from '@/data/interfaces/championship';
import { createContext, useState } from 'react';

interface AppProps {
  children: React.ReactNode;
}

export interface AppContextProps {
  currentChampionship: IChampionship;
  setCurrentChampionship: (championship: IChampionship) => void;
}

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({ children }: AppProps) => {
  const [currentChampionship, setCurrentChampionship] = useState<IChampionship>(
    {} as IChampionship,
  );

  return (
    <AppContext.Provider
      value={{
        currentChampionship,
        setCurrentChampionship,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
