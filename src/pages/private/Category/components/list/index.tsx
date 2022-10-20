// interface CreateModalProps {
//   onClose: () => void;
//   isOpen: boolean;
// }
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
import { useEffect } from 'react';

const ListCategory = () => {
  const { List, categories } = useCategoryData();

  useEffect(() => {
    List('d7edfd13-6322-4ae7-8e24-7b359881379c');
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
          {categories.map((category) => (
            <Tr key={category.id}>
              <Td p='26px'>{category.description}</Td>
              <Td p='26px'>
                <Tag size='md' key='md' variant='solid' colorScheme='teal'>
                  {category.name}
                </Tag>
              </Td>
              <Td p='26px'>
                <Flex justify='end'>....</Flex>
              </Td>
            </Tr>
          ))}
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
  );
};

export default ListCategory;
