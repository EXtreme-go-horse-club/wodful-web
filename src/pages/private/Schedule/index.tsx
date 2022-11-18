import ComponentModal from '@/components/Modal';
import { CategoryProvider } from '@/contexts/category';
import useCategoryData from '@/hooks/useCategoryData';
import { Box, Button, Flex, HStack, Select, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleForm from './components/form';
import Listchedule from './components/list';

const ScheduletWithProvider = () => {
  return (
    <CategoryProvider>
      <Schedule />
    </CategoryProvider>
  );
};

const Schedule = () => {
  const { id } = useParams();

  const [selectedCategory, setSelectedCategory] = useState<string>('Sem categoria');
  const { List: CategoryList, categories } = useCategoryData();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (id) CategoryList(id);
  }, [CategoryList, id]);

  return (
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
          <Select as='select' id='category' placeholder='Selecione a categoria'>
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
        <Listchedule />
      </Box>
    </Box>
  );
};

export default ScheduletWithProvider;
