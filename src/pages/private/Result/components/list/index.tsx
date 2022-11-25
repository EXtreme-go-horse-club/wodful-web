import useResultData from '@/hooks/useResultData';
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { MoreHorizontal } from 'react-feather';

const ListResults = () => {
  const { resultPages, Delete } = useResultData();

  const deleteResult = (id: string) => {
    Delete(id);
  };

  return (
    <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
      <Table variant='simple'>
        <Thead bg='gray.50' border='1px' borderColor='gray.100'>
          <Tr>
            <Th>
              <Text as='b'>PARTICIPANTES</Text>
            </Th>
            <Th>
              <Text as='b'>PROVA</Text>
            </Th>
            <Th>
              <Text as='b'>RESULTADO</Text>
            </Th>
            <Th>
              <Text as='b'>COLOCAÇÃO</Text>
            </Th>
            <Th>
              <Text as='b'>PONTOS</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {resultPages.length === 0 && (
            <Tr>
              <Td />
              <Td />
              <Td p={6} textAlign='center'>
                Busque por uma categoria
              </Td>
            </Tr>
          )}
          {resultPages?.map((result) => (
            <Tr key={result.id}>
              <Td p={6} textTransform='capitalize'>
                {result.nickname}
              </Td>
              <Td p={6}>{result.workout.name}</Td>
              <Td p={6}>{result.result}</Td>
              <Td p={6}>{result.classification}° Lugar</Td>
              <Td p={6}>
                {Number(result.points) === 0
                  ? 'Sem pontuação'
                  : `${Number(result.points)} ${Number(result.points) === 1 ? 'Ponto' : 'Pontos'}`}
              </Td>
              <Td p={6}>
                <Flex justify='end'>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label='Options'
                      icon={<MoreHorizontal />}
                      variant='none'
                    />
                    <MenuList>
                      <MenuItem onClick={() => deleteResult(result.id)}>Deletar</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ListResults;
