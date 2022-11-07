import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import {
  IParticipantForm,
  ISubscription,
  ISubscriptionDTO,
  ISubscriptionForm,
} from '@/data/interfaces/subscription';
import { SubscriptionService } from '@/services/Subscription';
import { subscriptionMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';

interface SubscriptionProviderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface SubscriptionContextData {
  subscriptionData: ISubscriptionDTO;
  setSubscriptionData: (value: ISubscriptionDTO) => void;
  subscriptionForm: ISubscriptionForm;
  setSubscriptionForm: (value: ISubscriptionForm) => void;
  participantsForm: IParticipantForm;
  setParticipantsForm: (value: IParticipantForm) => void;
  subscriptions: ISubscription[];
  subscriptionsPages: IPageResponse<ISubscription>;
  isLoading: boolean;
  limit: number;
  setLimit: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  List: (id: string) => Promise<void>;
  ListPaginated: (id: string) => Promise<void>;
  Create: () => Promise<void>;
}

const SubscriptionContext = createContext({} as SubscriptionContextData);

const axios = new AxiosAdapter();

export const SubscriptionProvider = ({ children, onClose }: SubscriptionProviderProps) => {
  const toast = useToast();
  const [subscriptionsPages, setSubscriptionsPages] = useState<IPageResponse<ISubscription>>(
    {} as IPageResponse<ISubscription>,
  );
  const [subscriptionForm, setSubscriptionForm] = useState<ISubscriptionForm>(
    {} as ISubscriptionForm,
  );
  const [participantsForm, setParticipantsForm] = useState<IParticipantForm>(
    {} as IParticipantForm,
  );
  const [subscriptionData, setSubscriptionData] = useState<ISubscriptionDTO>(
    {} as ISubscriptionDTO,
  );
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([] as ISubscription[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const List = useCallback(async (id: string) => {
    setIsLoading(true);
    await new SubscriptionService(axios)
      .listAll(id)
      .then((subscriptions) => {
        setSubscriptions(subscriptions as ISubscription[]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const ListPaginated = useCallback(
    async (id: string) => {
      setIsLoading(true);
      await new SubscriptionService(axios)
        .listAll(id, limit, page)
        .then((paginatedSubscriptions) => {
          setSubscriptionsPages(paginatedSubscriptions as IPageResponse<ISubscription>);
        })
        .finally(() => setIsLoading(false));
    },
    [limit, page],
  );

  const Create = useCallback(async () => {
    // const tempSubscription = { ...subscriptionData };
    // tempSubscription.nickname = subscription.nickname;
    // tempSubscription.participants = subscription.participants;
    // setSubscriptionData(tempSubscription);
    setIsLoading(true);
    await new SubscriptionService(axios)
      .create(subscriptionData)
      .then(() => {
        toast({
          title: subscriptionMessages['success'],
          status: 'success',
          isClosable: true,
        });
        // ListPaginated(championshipId);
        onClose!();
      })
      .catch(() => {
        toast({
          title: subscriptionMessages['error'],
          status: 'error',
          isClosable: true,
        });
      })
      .finally(() => setIsLoading(false));
  }, [toast, ListPaginated, onClose]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptionData,
        setSubscriptionData,
        participantsForm,
        setParticipantsForm,
        subscriptionForm,
        setSubscriptionForm,
        subscriptions,
        subscriptionsPages,
        isLoading,
        limit,
        page,
        setLimit,
        setPage,
        Create,
        List,
        ListPaginated,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionContext;
