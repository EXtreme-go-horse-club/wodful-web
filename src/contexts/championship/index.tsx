import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { ChampionshipDTO, IChampionship } from '@/data/interfaces/championship';
import { ChampionshipService } from '@/services/Championship';
import { championshipMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';

interface ChampionshipProps {
  children: React.ReactNode;
  onClose: () => void;
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

export const ChampionshipProvider = ({ children, onClose }: ChampionshipProps) => {
  const toast = useToast();
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
          toast({
            title: championshipMessages['success'],
            status: 'success',
            isClosable: true,
          });
          setChampionships((championships) => [...championships, newChampionship]);
          onClose();
        })
        .catch(() => {
          toast({
            title: championshipMessages['error'],
            status: 'error',
            isClosable: true,
          });
        })
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
