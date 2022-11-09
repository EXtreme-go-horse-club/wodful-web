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
import { useParams } from 'react-router-dom';

interface SubscriptionProviderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface SubscriptionContextData {
  subscriptionForm: ISubscriptionForm;
  setSubscriptionForm: (value: ISubscriptionForm) => void;
  subscriptions: ISubscription[];
  subscriptionsPages: IPageResponse<ISubscription>;
  isLoading: boolean;
  limit: number;
  setLimit: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  List: (id: string) => Promise<void>;
  ListPaginated: (id: string) => Promise<void>;
  Create: (participants: IParticipantForm) => Promise<void>;
}

const SubscriptionContext = createContext({} as SubscriptionContextData);

const axios = new AxiosAdapter();

export const SubscriptionProvider = ({ children, onClose }: SubscriptionProviderProps) => {
  const { id } = useParams();
  const toast = useToast();
  const [subscriptionsPages, setSubscriptionsPages] = useState<IPageResponse<ISubscription>>(
    {} as IPageResponse<ISubscription>,
  );
  const [subscriptionForm, setSubscriptionForm] = useState<ISubscriptionForm>(
    {} as ISubscriptionForm,
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

  const Create = useCallback(
    async (participants: IParticipantForm) => {
      const subscriptionDTO: ISubscriptionDTO = {
        nickname: participants.nickname,
        participants: participants.participants,
        responsibleEmail: subscriptionForm.responsibleEmail,
        responsibleName: subscriptionForm.responsibleName,
        responsiblePhone: subscriptionForm.responsiblePhone,
        ticketId: subscriptionForm.ticketId,
      };
      setIsLoading(true);
      await new SubscriptionService(axios)
        .create(subscriptionDTO)
        .then(() => {
          toast({
            title: subscriptionMessages['success'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(id as string);
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
    },
    [subscriptionForm, toast, onClose],
  );

  return (
    <SubscriptionContext.Provider
      value={{
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
