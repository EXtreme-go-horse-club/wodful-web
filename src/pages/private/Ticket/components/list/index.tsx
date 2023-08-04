import ComponentModal from '@/components/ComponentModal';
import DeleteData from '@/components/Delete';
import { ITicket } from '@/data/interfaces/ticket';
import useTicketData from '@/hooks/useTicketData';
import { formatCurrency } from '@/utils/formatCurrency';
import { incrementAndFormatDate } from '@/utils/formatDate';
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
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'react-feather';
import { useParams } from 'react-router-dom';

interface IListTicketProps {
  openEdit: (ticket: ITicket) => void;
}

const ListTicket = ({ openEdit }: IListTicketProps) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const { ListPaginated, ticketsPages, page, limit, setLimit, setPage, isLoading, Delete } =
    useTicketData();

  const [ticketId, setTicketId] = useState<string>('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();

  useEffect(() => {
    ListPaginated(id as string);
    setCurrentTotal(ticketsPages.results?.length);
  }, [ListPaginated, id, ticketsPages.results?.length]);

  const openDelete = (id: string) => {
    setTicketId(id);
    onOpen();
  };

  const confirmDelete = () => {
    Delete(ticketId);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const countRestTickets = useCallback((quantity: number, inUse: number) => {
    if (quantity - inUse === 0) return 'Esgotado';

    return quantity - inUse;
  }, []);

  return (
    <>
      <ComponentModal modalHeader='Remover ingresso' size='sm' isOpen={isOpen} onClose={onClose}>
        <DeleteData onClose={onClose} removedData='o ingresso' confirmDelete={confirmDelete} />
      </ComponentModal>
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
                <Text as='b'>Quantidade</Text>
              </Th>
              <Th>
                <Text as='b'>Restantes</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {ticketsPages.results?.map((ticket) => (
              <Tr key={ticket.id}>
                <Td p={6}>{ticket.name}</Td>

                <Td p={6}>{formatCurrency(ticket.price)}</Td>
                <Td p={6}>{incrementAndFormatDate(ticket.startDate)}</Td>
                <Td p={6}>{incrementAndFormatDate(ticket.endDate)}</Td>
                <Td p={6}>{ticket.quantity}</Td>
                <Td p={6}>{countRestTickets(ticket.quantity, ticket.inUse)}</Td>

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
                        <MenuItem onClick={() => openEdit(ticket)}>Editar</MenuItem>
                        <MenuItem onClick={() => openDelete(ticket.id)}>Deletar</MenuItem>
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
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th maxW='100px'>
                <Flex justify='end'>
                  <HStack>
                    {page === 1 && (
                      <Text>
                        {page * limit - (limit - 1)} - {page * limit} de {ticketsPages.count}
                      </Text>
                    )}

                    {page !== 1 && (
                      <Text>
                        {page * limit - (limit - 1)} - {page * limit - limit + currentTotal} de{' '}
                        {ticketsPages.count}
                      </Text>
                    )}
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
    </>
  );
};

export default ListTicket;
