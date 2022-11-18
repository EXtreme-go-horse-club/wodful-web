import useScheduleData from '@/hooks/useScheduleData';
import { formatDate, formatHour } from '@/utils/formatDate';
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Zap } from 'react-feather';

interface IListLeaderboard {
  champ: string;
  category: string;
}

const Listchedule = ({ champ, category }: IListLeaderboard) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);
  const { ListPaginated, schedulePages, page, limit, setLimit, setPage, isLoading } =
    useScheduleData();

  useEffect(() => {
    if (champ && category) {
      ListPaginated(champ, category);
      setCurrentTotal(schedulePages.results?.length);
    }
  }, [ListPaginated, category, champ, schedulePages.results?.length]);

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const deleteResult = (id: string) => {
    console.log(id);
  };
  return (
    <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
      <Table variant='simple'>
        <Thead bg='gray.50' border='1px' borderColor='gray.100'>
          <Tr>
            <Th></Th>
            <Th px={1}>
              <Text as='b'>DATA</Text>
            </Th>
            <Th px={1}>
              <Text as='b'>HORÁRIO</Text>
            </Th>
            <Th px={1}>
              <Text as='b'>CATEGORIA</Text>
            </Th>
            <Th px={1}>
              <Text as='b'>PROVA</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {schedulePages.results?.map((result) => (
            <Tr key={result.id}>
              <Td>
                <ChevronDown cursor='pointer' />
              </Td>

              <Td py={6} px={1} textTransform='capitalize'>
                {formatDate(result.date)}
              </Td>
              <Td py={6} px={1} textTransform='capitalize'>
                {formatHour(result.hour)}
              </Td>

              <Td py={6} px={1} textTransform='capitalize'>
                {result.category.name}
              </Td>
              <Td py={6} px={1} textTransform='capitalize'>
                {result.workout.name}
              </Td>
              <Td py={6} px={1}>
                <Flex justify='end' alignItems='center' gap='20px'>
                  <Zap
                    size={16}
                    onClick={() => result.isLive!}
                    cursor='pointer'
                    fill={result.isLive ? 'red' : 'white'}
                  />

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
                      {page * limit - (limit - 1)} - {page * limit} de {schedulePages.count}
                    </Text>
                  )}

                  {page !== 1 && (
                    <Text>
                      {page * limit - (limit - 1)} - {page * limit - limit + currentTotal} de{' '}
                      {schedulePages.count}
                    </Text>
                  )}
                  <Tooltip label='Página anterior' placement='top' hasArrow>
                    <Button
                      disabled={!schedulePages.previous || isLoading}
                      variant='link'
                      onClick={previousPage}
                    >
                      <ChevronLeft color={schedulePages.previous ? 'black' : 'gray'} size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip label='Próxima página' placement='top' hasArrow>
                    <Button
                      disabled={!schedulePages.next || isLoading}
                      variant='link'
                      onClick={nextPage}
                    >
                      <ChevronRight color={schedulePages.next ? 'black' : 'gray'} size={16} />
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

export default Listchedule;
