import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { CategoryModel } from '@/models/categoryMode';
import { CategoryService } from '@/services/Category';
import {
  Box,
  Button,
  Flex,
  HStack,
  Select,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

const Category = () => {
  const axios = new AxiosAdapter();
  const [categories, setCategories] = useState<CategoryModel[]>([] as CategoryModel[]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCategories = async () => {
    setIsLoading(true);
    await new CategoryService(axios)
      .listAllCategories()
      .then((userData) => {
        setCategories(userData);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <Box w='100%' display='flex' flexDirection='column' alignItems='center' p='24px'>
      <HStack w='100%' justifyContent='space-between'>
        <Text fontSize='2xl' as='b'>
          Lista de categorias
        </Text>
        <Button colorScheme='teal' size='md' onClick={getCategories}>
          Adicionar categoria
        </Button>
      </HStack>

      <Box w='100%' marginTop='24px'>
        <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
          <Table variant='simple'>
            <Thead bg='gray.50' border='1px' borderColor='gray.100'>
              <Tr>
                <Th>Categoria</Th>
                <Th>Formato</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>
                  <Tag size='md' key='md' variant='solid' colorScheme='teal'>
                    Teal
                  </Tag>
                </Td>
                <Td>
                  <Flex justify='end'>...</Flex>
                </Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th display='flex' flexDirection='row'>
                  <Flex align='center' mr='8px'>
                    Linhas por página
                  </Flex>

                  <Select placeholder='1' w='75px'>
                    <option value='option1'>1</option>
                    <option value='option2'>2</option>
                    <option value='option3'>3</option>
                  </Select>
                </Th>
                <Th></Th>
                <Th>
                  <Flex justify='end'>1-5 de 32</Flex>{' '}
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Category;
