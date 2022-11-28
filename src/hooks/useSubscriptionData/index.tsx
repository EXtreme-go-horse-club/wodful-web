import SubscriptionContext, { SubscriptionContextData } from '@/contexts/subscription';
import { useContext } from 'react';

const useSubscriptionData = (): SubscriptionContextData => {
  const context = useContext<SubscriptionContextData>(SubscriptionContext);

  return context;
};

export default useSubscriptionData;
