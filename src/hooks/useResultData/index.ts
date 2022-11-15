import ResultContext, { ResultContextData } from '@/contexts/result';
import { useContext } from 'react';

const useResultData = (): ResultContextData => {
  const context = useContext<ResultContextData>(ResultContext);

  return context;
};

export default useResultData;
