import useCategoryData from '@/hooks/useCategoryData';
import {
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
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'react-feather';

const ListCategory = () => {
  //Mover para dentro do contexto.
  const { ListPaginated, categoriesPages, page, limit, setLimit, setPage } = useCategoryData();

  useEffect(() => {
    ListPaginated('47e3b328-de59-4725-a5d8-82b40b9b9a2a');
  }, [ListPaginated]);

  return (
    <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
      <Table variant='simple'>
        <Thead bg='gray.50' border='1px' borderColor='gray.100'>
          <Tr>
            <Th>
              <Text as='b'>Categoria</Text>
            </Th>
            <Th>
              <Text as='b'>Formato</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {categoriesPages.results?.map((category) => (
            <Tr key={category.id}>
              <Td p={6}>{category.name}</Td>
              <Td p={6}>
                <Tag
                  size='md'
                  key='md'
                  variant='solid'
                  colorScheme={category.isTeam ? 'teal' : 'blue'}
                >
                  {category.isTeam ? 'Time' : 'Individual'}
                </Tag>
              </Td>
              <Td p={6}>
                <Flex justify='end'>
                  <MoreHorizontal cursor='pointer' size={18} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th display='flex' flexDirection='row'>
              <Flex align='center' mr={2}>
                Linhas por página
              </Flex>

              <Select
                w='75px'
                onChange={(event) => {
                  console.log(event.target.value);
                  setLimit(Number(event.target.value));
                  setPage(Number(1));
                  ListPaginated('47e3b328-de59-4725-a5d8-82b40b9b9a2a');
                }}
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='20'>20</option>
              </Select>
            </Th>
            <Th></Th>
            <Th>
              <Flex justify='end'>
                <HStack>
                  <Text>
                    {page * limit - (limit - 1)} - {page * limit} de {categoriesPages.count}
                  </Text>
                  <Button
                    variant='link'
                    onClick={() => {
                      categoriesPages.previous && setPage(page - 1);
                      categoriesPages.previous &&
                        ListPaginated('47e3b328-de59-4725-a5d8-82b40b9b9a2a');
                    }}
                  >
                    <ChevronLeft
                      cursor='pointer'
                      color={categoriesPages.previous ? 'black' : 'gray'}
                      size={16}
                    />
                  </Button>
                  <Button
                    variant='link'
                    onClick={() => {
                      categoriesPages.next && setPage(page + 1);
                      categoriesPages.next && ListPaginated('47e3b328-de59-4725-a5d8-82b40b9b9a2a');
                      console.log('depois', page);
                    }}
                  >
                    <ChevronRight
                      cursor='pointer'
                      color={categoriesPages.next ? 'black' : 'gray'}
                      size={16}
                    />
                  </Button>
                </HStack>
              </Flex>
            </Th>
            {/* (page * limit -(limit-1)) -> (page * limit) de count 
            1*5 - (5-1) -> 1*5 de 32
            5-4 -> 5 de 32
            1 -> 5 

            3*5 - (5-1) -> 3*5 de 32
            15-4 -> 15 de 32
            11 -> 15
            
            
            
            */}
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default ListCategory;
