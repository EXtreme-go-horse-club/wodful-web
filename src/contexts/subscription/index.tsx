import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import {
  IParticipantForm,
  ISubscription,
  ISubscriptionDTO,
  ISubscriptionForm,
  UpdateSubscriptionDTO,
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
  subscription: ISubscription;
  subscriptionsPages: IPageResponse<ISubscription>;
  isLoading: boolean;
  limit: number;
  setLimit: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  Delete: (id: string) => Promise<void>;
  List: (id: string) => Promise<void>;
  UpdateStatus: (id: string, status: string) => Promise<void>;
  ListPaginated: (id: string, categoryId?: string) => Promise<void>;
  ListAllByCategory: (categoryId: string) => Promise<void>;
  Create: (participants: IParticipantForm) => Promise<void>;
  Get: (id: string) => Promise<void>;
  Update: (id: string, data: UpdateSubscriptionDTO) => Promise<void>;
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
  const [subscription, setSubscription] = useState<ISubscription>({} as ISubscription);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Get = useCallback(async (id: string) => {
    setIsLoading(true);
    await new SubscriptionService(axios)
      .get(id)
      .then((subs) => setSubscription(subs))
      .finally(() => setIsLoading(false));
  }, []);

  const List = useCallback(async (id: string) => {
    setIsLoading(true);
    await new SubscriptionService(axios)
      .listAll(id)
      .then((subscriptions) => {
        setSubscriptions(subscriptions as ISubscription[]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const ListAllByCategory = useCallback(
    async (categoryId: string) => {
      setIsLoading(true);
      await new SubscriptionService(axios)
        .listAllByCategory(String(id), categoryId)
        .then((allSubs) => {
          setSubscriptions(allSubs as ISubscription[]);
        })
        .finally(() => setIsLoading(false));
    },
    [id],
  );

  const ListPaginated = useCallback(
    async (id: string, categoryId?: string) => {
      setIsLoading(true);
      await new SubscriptionService(axios)
        .listAll(id, limit, page, categoryId)
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
    [
      subscriptionForm.responsibleEmail,
      subscriptionForm.responsibleName,
      subscriptionForm.responsiblePhone,
      subscriptionForm.ticketId,
      toast,
      ListPaginated,
      id,
      onClose,
    ],
  );

  const Delete = useCallback(
    async (idSub: string) => {
      setIsLoading(true);
      await new SubscriptionService(axios)
        .delete(idSub)
        .then(() => {
          toast({
            title: subscriptionMessages['remove'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(String(id));
        })
        .catch(() => {
          toast({
            title: subscriptionMessages['remove_err'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, id, toast],
  );

  const Update = useCallback(
    async (id: string, data: UpdateSubscriptionDTO) => {
      setIsLoading(true);
      await new SubscriptionService(axios)
        .update(id, data)
        .then(() => {
          toast({
            title: subscriptionMessages['update'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(String(id));
        })
        .catch(() => {
          toast({
            title: subscriptionMessages['update_err'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, toast],
  );

  const UpdateStatus = useCallback(
    async (idSub: string, status: string) => {
      setIsLoading(true);
      await new SubscriptionService(axios)
        .updateStatus(idSub, status)
        .then(() => {
          toast({
            title: subscriptionMessages['status_update'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(String(id));
        })
        .catch(() => {
          toast({
            title: subscriptionMessages['status_update_err'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, id, toast],
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
        Delete,
        UpdateStatus,
        List,
        ListPaginated,
        ListAllByCategory,
        Get,
        subscription,
        Update,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionContext;
