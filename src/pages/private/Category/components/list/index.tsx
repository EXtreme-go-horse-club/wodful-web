import useCategoryData from '@/hooks/useCategoryData';
import {
  Flex,
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
import { useEffect, useState } from 'react';
import { MoreHorizontal } from 'react-feather';

const ListCategory = () => {
  const [limit, setLimit] = useState('');
  const [page, setPage] = useState();
  const { List, categories } = useCategoryData();

  useEffect(() => {
    List('47e3b328-de59-4725-a5d8-82b40b9b9a2a');
  }, [List]);

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
          {categories?.map((category) => (
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
                  setLimit(event.target.value);
                }}
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='20'>20</option>
              </Select>
            </Th>
            <Th></Th>
            <Th>
              <Flex justify='end'>1-5 de 32</Flex>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default ListCategory;
