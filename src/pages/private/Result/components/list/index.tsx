import useResultData from '@/hooks/useResultData';
import {
  Button,
  Flex,
  HStack,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'react-feather';

interface IListResults {
  id: string;
}

const ListResults = ({ id }: IListResults) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const { ListPaginated, resultPages, page, limit, setLimit, setPage, isLoading } = useResultData();

  useEffect(() => {
    if (id) {
      ListPaginated(id);
      setCurrentTotal(resultPages.results?.length);
    }
  }, [ListPaginated, id, resultPages.results?.length]);

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
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
              <Text as='b'>COLOCAÇÃO</Text>
            </Th>
            <Th>
              <Text as='b'>PONTOS</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {resultPages.results?.map((result) => (
            <Tr key={result.id}>
              <Td p={6} textTransform='capitalize'>
                {result.nickname}
              </Td>
              <Td p={6}>{result.workout.name}</Td>
              <Td p={6}>{result.classification}° Lugar</Td>
              <Td p={6}>
                {Number(result.points) === 0
                  ? 'Sem pontuação'
                  : `${Number(result.points)} ${Number(result.points) === 1 ? 'Ponto' : 'Pontos'}`}
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
                  setLimit(Number(event.target.value));
                  setPage(Number(1));
                }}
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='20'>20</option>
              </Select>
            </Th>
            <Th />
            <Th />
            <Th />
            <Th>
              <Flex justify='end'>
                <HStack>
                  {page === 1 && (
                    <Text>
                      {page * limit - (limit - 1)} - {page * limit} de {resultPages.count}
                    </Text>
                  )}

                  {page !== 1 && (
                    <Text>
                      {page * limit - (limit - 1)} - {page * limit - limit + currentTotal} de{' '}
                      {resultPages.count}
                    </Text>
                  )}
                  <Tooltip label='Página anterior' placement='top' hasArrow>
                    <Button
                      disabled={!resultPages.previous || isLoading}
                      variant='link'
                      onClick={previousPage}
                    >
                      <ChevronLeft color={resultPages.previous ? 'black' : 'gray'} size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip label='Próxima página' placement='top' hasArrow>
                    <Button
                      disabled={!resultPages.next || isLoading}
                      variant='link'
                      onClick={nextPage}
                    >
                      <ChevronRight color={resultPages.next ? 'black' : 'gray'} size={16} />
                    </Button>
                  </Tooltip>
                </HStack>
              </Flex>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default ListResults;
