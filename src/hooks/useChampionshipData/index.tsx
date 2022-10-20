/* eslint-disable react-hooks/rules-of-hooks */
import ChampionshipContext, { ChampionshipContextData } from '@/contexts/championship';
import { useContext } from 'react';

const useChampionships = (): ChampionshipContextData => {
  const context = useContext<ChampionshipContextData>(ChampionshipContext);

  return context;
};

export default useChampionships;
