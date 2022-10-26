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
import { MoreHorizontal } from 'react-feather';

const ListTicket = () => {
  const dale = 'dole';

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

              <Select placeholder='1' w='75px'>
                <option value='option1'>1</option>
                <option value='option2'>2</option>
                <option value='option3'>3</option>
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

export default ListTicket;
