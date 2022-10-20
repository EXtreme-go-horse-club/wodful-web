import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IChampionship } from '@/data/interfaces/championship';
import { ChampionshipDTO, ChampionshipService } from '@/services/Championship';
import { createContext, useCallback, useState } from 'react';

interface ChampionshipProps {
  children: React.ReactNode;
}

export interface ChampionshipContextData {
  championships: IChampionship[];
  isLoading: boolean;
  isError: boolean;
  List: () => Promise<void>;
  Create({
    name,
    startDate,
    endDate,
    accessCode,
    banner,
    resultType,
    address,
  }: ChampionshipDTO): Promise<void>;
}

const ChampionshipContext = createContext({} as ChampionshipContextData);

const axios = new AxiosAdapter();

export const ChampionshipProvider = ({ children }: ChampionshipProps) => {
  const [championships, setChampionships] = useState<IChampionship[]>([] as IChampionship[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const Create = useCallback(
    async ({
      name,
      startDate,
      endDate,
      accessCode,
      banner,
      resultType,
      address,
    }: ChampionshipDTO) => {
      setIsLoading(true);
      await new ChampionshipService(axios)
        .create({ name, startDate, endDate, accessCode, banner, resultType, address })
        .then((newChampionship) => {
          setIsError(false);
          setChampionships([...championships, newChampionship]);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    },
    [],
  );

  const List = useCallback(async () => {
    setIsLoading(true);
    await new ChampionshipService(axios)
      .listAll()
      .then((allChampionships) => {
        setIsError(false);
        setChampionships(allChampionships);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ChampionshipContext.Provider
      value={{
        Create,
        isLoading,
        isError,
        List,
        championships,
      }}
    >
      {children}
    </ChampionshipContext.Provider>
  );
};

export default ChampionshipContext;
