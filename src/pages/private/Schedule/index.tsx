import { Loader } from '@/components/Loader';
import ComponentModal from '@/components/Modal';
import { CategoryProvider } from '@/contexts/category';
import { WorkoutProvider } from '@/contexts/workout';
import useCategoryData from '@/hooks/useCategoryData';
import useScheduleData from '@/hooks/useScheduleData';
import { Box, Button, Flex, HStack, Select, Text, useDisclosure } from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleForm from './components/form';
import Listchedule from './components/list';

const ScheduletWithProvider = () => {
  return (
    <CategoryProvider>
      <WorkoutProvider>
        <Schedule />
      </WorkoutProvider>
    </CategoryProvider>
  );
};

const Schedule = () => {
  const { id } = useParams();

  const [selectedCategory, setSelectedCategory] = useState<string>('Sem categoria');
  const [categoryId, setCategoryId] = useState<string>('');
  const { ListPaginated } = useScheduleData();
  const { List: CategoryList, categories } = useCategoryData();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (id) CategoryList(id);
  }, [CategoryList, id]);

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box
        as='main'
        role='main'
        w='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        p={6}
      >
        <HStack as='section' role='textbox' w='100%' justifyContent='space-between'>
          <Flex as='article' role='textbox' direction='column' gap='0.75rem'>
            <Text fontSize='2xl' as='b' role='heading'>
              Cronograma
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
              placeholder='Selecione a categoria'
              onChange={(event) => {
                if (event.target.value) {
                  ListPaginated(String(id), event.target.value);
                  setCategoryId(event.target.value);
                  setSelectedCategory(
                    categories.find((selected) => selected.id === event.target.value)!.name,
                  );
                }
              }}
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Button minW='170px' w='100%' colorScheme='teal' size='md' onClick={onOpen}>
              Adicionar no cronograma
            </Button>
          </Flex>
        </HStack>

        <ComponentModal
          modalHeader='Adicionar no cronograma'
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        >
          <ScheduleForm onClose={onClose} />
        </ComponentModal>

        <Box as='section' w='100%' marginTop={6}>
          <Listchedule category={categoryId as string} champ={id as string} />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ScheduletWithProvider;
