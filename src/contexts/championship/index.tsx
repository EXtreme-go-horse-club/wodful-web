import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IChampionship } from '@/data/interfaces/championship';
import { ChampionshipService } from '@/services/Championship';
import { createContext, useCallback, useState } from 'react';

interface ChampionshipProps {
  children: React.ReactNode;
}

export interface ChampionshipData {
  championship: IChampionship | null;
  isLoading: boolean;
  isError: boolean;
  CreateChampionship({
    name,
    startDate,
    endDate,
    accessCode,
    banner,
    resultType,
    address,
  }: IChampionship): Promise<void>;
}

const ChampionshipContext = createContext({} as ChampionshipData);

const axios = new AxiosAdapter();

export const CreateChampionshipProvider = ({ children }: ChampionshipProps) => {
  const [championship, setChampionship] = useState<IChampionship | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const CreateChampionship = useCallback(
    async ({
      name,
      startDate,
      endDate,
      accessCode,
      banner,
      resultType,
      address,
    }: IChampionship) => {
      setIsLoading(true);
      await new ChampionshipService(axios)
        .createChampionship({ name, startDate, endDate, accessCode, banner, resultType, address })
        .then((championshipData) => {
          setIsError(false);
          setChampionship(championshipData);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    },
    [],
  );

  return (
    <ChampionshipContext.Provider
      value={{
        CreateChampionship,
        isLoading,
        isError,
        championship,
      }}
    >
      {children}
    </ChampionshipContext.Provider>
  );
};

export default ChampionshipContext;
