import ComponentModal from '@/components/ComponentModal';
import { Loader } from '@/components/Loader';
import { CategoryProvider } from '@/contexts/category';

import { SubscriptionProvider } from '@/contexts/subscription';
import { TicketProvider } from '@/contexts/ticket';
import useCategoryData from '@/hooks/useCategoryData';
import useSubscriptionData from '@/hooks/useSubscriptionData';
import { Box, Button, Flex, HStack, Select, Text, useDisclosure } from '@chakra-ui/react';
import { ChangeEvent, lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSubscriptionParticipants from './components/formParticipants';
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
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [categoryId, setCategoryId] = useState<string>('');
  const { List: CategoryList, categories } = useCategoryData();
  const { ListPaginated } = useSubscriptionData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [participantsNumber, setParticipantsNumber] = useState<number>(0);

  function handleSubscriptionInfo(step: number, participantsNumber: number) {
    setParticipantsNumber(participantsNumber);
    setCurrentStep(step);
  }

  const resetCategoryData= () =>{
    setSelectedCategory("Todos");
    setCategoryId('');
  }

  const openCreate = () => {
    resetCategoryData();
    ListPaginated(id as string);
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
              <ListSubscription id={id as string} categoryId={categoryId} />
            </Box>
          </>


        <ComponentModal
          modalHeader='Adicionar inscrição'
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        >
          {currentStep == 0 ? (
            <FormSubscription id={id as string} openFormParticipants={handleSubscriptionInfo} />
          ) : (
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
