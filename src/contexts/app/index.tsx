import { IChampionship } from '@/data/interfaces/championship';
import { createContext, useState } from 'react';

interface AppProps {
  children: React.ReactNode;
}

export interface AppContextProps {
  currentChampionship: IChampionship;
  setCurrentChampionship: (championship: IChampionship) => void;
  publicChampionshipName: string;
  setPublicChampionshipName: (name: string) => void;
}

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({ children }: AppProps) => {
  const [currentChampionship, setCurrentChampionship] = useState<IChampionship>(
    {} as IChampionship,
  );
  const [publicChampionshipName, setPublicChampionshipName] = useState<string>('');

  return (
    <AppContext.Provider
      value={{
        currentChampionship,
        setCurrentChampionship,
        publicChampionshipName,
        setPublicChampionshipName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
