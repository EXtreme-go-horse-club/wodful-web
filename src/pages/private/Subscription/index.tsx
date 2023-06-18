import ComponentModal from '@/components/ComponentModal';
import { Loader } from '@/components/Loader';
import { CategoryProviderMemo as CategoryProvider } from '@/contexts/category';

import { SubscriptionProviderMemo as SubscriptionProvider } from '@/contexts/subscription';
import { TicketProviderMemo as TicketProvider } from '@/contexts/ticket';
import useCategoryData from '@/hooks/useCategoryData';
import useSubscriptionData from '@/hooks/useSubscriptionData';
import { Box, Button, Flex, HStack, Select, Text, useDisclosure } from '@chakra-ui/react';
import { ChangeEvent, Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSubscriptionParticipants from './components/formParticipants';
import FormResponsible from './components/formResponsible';
import FormSubscription from './components/formSubscription';

const ListSubscription = lazy(() => import('./components/list'));

const SubscriptionWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <CategoryProvider>
      <TicketProvider onClose={onClose}>
        <SubscriptionProvider onClose={onClose}>
          <Subscription />
        </SubscriptionProvider>
      </TicketProvider>
    </CategoryProvider>
  );
};

const Subscription = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [categoryId, setCategoryId] = useState<string>('');
  const [subscriptionId, setSubscriptionId] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [participantsNumber, setParticipantsNumber] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ListPaginated } = useSubscriptionData();
  const { List: CategoryList, categories } = useCategoryData();

  function handleSubscriptionInfo(step: number, participantsNumber: number) {
    setParticipantsNumber(participantsNumber);
    setCurrentStep(step);
  }

  const resetCategoryData = () => {
    setSelectedCategory('Todos');
    setCategoryId('');
  };

  const openCreate = () => {
    setIsEditing(false);
    resetCategoryData();
    ListPaginated(id as string);
    onOpen();
  };

  const openEdit = (subscriptionId: string) => {
    setSubscriptionId(subscriptionId);
    setIsEditing(true);
    onOpen();
  };

  const handleChangeCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value) {
        setCategoryId(event.target.value);
        setSelectedCategory(
          categories.find((selected) => selected.id === event.target.value)!.name,
        );
        return;
      }
      resetCategoryData();
    },
    [categories],
  );

  useEffect(() => {
    if (id) {
      CategoryList(id);
    }
  }, [CategoryList, id]);

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
        <>
          <HStack w='100%' justifyContent='space-between'>
            <Flex as='article' role='textbox' direction='column' gap='0.75rem'>
              <Text fontSize='2xl' as='b' role='heading'>
                Inscrições
              </Text>
              <Text
                as='b'
                role='textbox'
                fontSize='0.75rem'
                color='gray.500'
                border='1px'
                borderColor='gray.500'
                borderRadius='4px'
                padding='2px 8px'
                textTransform='capitalize'
              >
                Categoria: {selectedCategory}
              </Text>
            </Flex>
            <Flex as='article' gap='1rem'>
              <Select
                as='select'
                id='category'
                value={categoryId}
                placeholder='Selecionar categoria'
                onChange={(event) => handleChangeCategory(event)}
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <Button minW='170px' colorScheme='teal' size='md' onClick={openCreate}>
                Adicionar inscrição
              </Button>
            </Flex>
          </HStack>
          <Box w='100%' marginTop={6}>
            <ListSubscription id={id as string} categoryId={categoryId} onEdit={openEdit} />
          </Box>
        </>

        <ComponentModal
          modalHeader={`${isEditing ? 'Editar' : 'Adicionar'} inscrição`}
          size='lg'
          isOpen={isOpen}
          onClose={() => {
            handleSubscriptionInfo(0, 0);
            onClose();
          }}
        >
          {isEditing && <FormResponsible subId={subscriptionId} onClose={onClose} />}
          {!isEditing && currentStep === 0 && (
            <FormSubscription id={id as string} openFormParticipants={handleSubscriptionInfo} />
          )}
          {!isEditing && currentStep !== 0 && (
            <FormSubscriptionParticipants
              participantsNumber={participantsNumber as number}
              onClose={onClose}
              resetStep={handleSubscriptionInfo}
            />
          )}
        </ComponentModal>
      </Box>
    </Suspense>
  );
};

export default SubscriptionWithProvider;
