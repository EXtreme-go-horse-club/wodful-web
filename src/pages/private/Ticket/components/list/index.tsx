import useTicketData from '@/hooks/useTicketData';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
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
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'react-feather';
import { useParams } from 'react-router-dom';

const ListTicket = () => {
  const { ListPaginated, ticketsPages, page, limit, setLimit, setPage, isLoading } =
    useTicketData();

  const { id } = useParams();

  useEffect(() => {
    ListPaginated(id as string);
  }, [ListPaginated, id]);

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
              <Text as='b'>Nome</Text>
            </Th>
            <Th>
              <Text as='b'>Valor do ingresso</Text>
            </Th>
            <Th>
              <Text as='b'>Início</Text>
            </Th>
            <Th>
              <Text as='b'>Encerramento</Text>
            </Th>
            <Th>
              <Text as='b'>qnt. máx</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {ticketsPages.results?.map((ticket) => (
            <Tr key={ticket.id}>
              <Td p={6}>{ticket.name}</Td>

              <Td p={6}>{formatCurrency(ticket.price)}</Td>
              <Td p={6}>{formatDate(ticket.startDate)}</Td>
              <Td p={6}>{formatDate(ticket.endDate)}</Td>
              <Td p={6}>{ticket.quantity}</Td>

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
                  ListPaginated(id as string);
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
                    {page * limit - (limit - 1)} - {page * limit} de {ticketsPages.count}
                  </Text>
                  <Tooltip label='Página anterior' placement='top' hasArrow>
                    <Button
                      disabled={!ticketsPages.previous || isLoading}
                      variant='link'
                      onClick={previousPage}
                    >
                      <ChevronLeft color={ticketsPages.previous ? 'black' : 'gray'} size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip label='Próxima página' placement='top' hasArrow>
                    <Button
                      disabled={!ticketsPages.next || isLoading}
                      variant='link'
                      onClick={nextPage}
                    >
                      <ChevronRight color={ticketsPages.next ? 'black' : 'gray'} size={16} />
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

export default ListTicket;
