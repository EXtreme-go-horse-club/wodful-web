import useCategoryData from '@/hooks/useCategoryData';
import useLeaderboardData from '@/hooks/useLeaderboardData';
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
import { ChevronLeft, ChevronRight } from 'react-feather';

interface IListLeaderboard {
  champ: string;
  category: string;
}

const ListLeaderboard = ({ champ, category }: IListLeaderboard) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const { categories } = useCategoryData();

  const { ListPaginated, leaderboardPages, page, limit, setLimit, setPage, isLoading } =
    useLeaderboardData();

  useEffect(() => {
    if (champ && category) {
      ListPaginated(champ, category);
      setCurrentTotal(leaderboardPages.results?.length);
    }
  }, [ListPaginated, category, champ, leaderboardPages.results?.length]);

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
              <Text as='b'>CATEGORIA</Text>
            </Th>
            <Th>
              <Text as='b'>COLOCAÇÃO</Text>
            </Th>
            <Th>
              <Text as='b'>PONTUAÇÃO GERAL</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories?.length && !leaderboardPages.results && (
            <Tr>
              <Td />
              <Td />
              <Td p={6} textAlign='center'>
                Busque por uma categoria
              </Td>
            </Tr>
          )}

          {leaderboardPages.results?.length === 0 && (
            <Tr>
              <Td />
              <Td />
              <Td p={6} textAlign='center'>
                Sua categoria não tem inscrições ainda.
              </Td>
            </Tr>
          )}

          {leaderboardPages.results?.map((leaderboard) => (
            <Tr key={`${leaderboard.nickname}_${leaderboard.generalScore}`}>
              <Td p={6} textTransform='capitalize'>
                {leaderboard.nickname}
              </Td>
              <Td p={6} textTransform='capitalize'>
                {leaderboard.category.name}
              </Td>
              <Td p={6} textTransform='capitalize'>
                {leaderboard.ranking === 0 ? 'Sem ranking' : `${leaderboard.ranking}° Lugar`}
              </Td>
              <Td p={6} textTransform='capitalize'>
                {leaderboard.generalScore === 0
                  ? 'Sem pontuação'
                  : `${leaderboard.generalScore} ${
                      leaderboard.generalScore === 1 ? 'Ponto' : 'Pontos'
                    }`}
              </Td>
              <Td />
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
                      {page * limit - (limit - 1)} - {page * limit} de {leaderboardPages.count}
                    </Text>
                  )}

                  {page !== 1 && (
                    <Text>
                      {page * limit - (limit - 1)} - {page * limit - limit + currentTotal} de{' '}
                      {leaderboardPages.count}
                    </Text>
                  )}
                  <Tooltip label='Página anterior' placement='top' hasArrow>
                    <Button
                      disabled={!leaderboardPages.previous || isLoading}
                      variant='link'
                      onClick={previousPage}
                    >
                      <ChevronLeft color={leaderboardPages.previous ? 'black' : 'gray'} size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip label='Próxima página' placement='top' hasArrow>
                    <Button
                      disabled={!leaderboardPages.next || isLoading}
                      variant='link'
                      onClick={nextPage}
                    >
                      <ChevronRight color={leaderboardPages.next ? 'black' : 'gray'} size={16} />
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

export default ListLeaderboard;
