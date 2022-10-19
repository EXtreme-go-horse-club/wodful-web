/* eslint-disable react-hooks/rules-of-hooks */
import ChampionshipContext, { ChampionshipData } from '@/contexts/championship';
import { useContext } from 'react';

const useChampionship = (): ChampionshipData => {
  const context = useContext<ChampionshipData>(ChampionshipContext);

  return context;
};

export default useChampionship;
