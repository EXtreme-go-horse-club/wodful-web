import useTicketData from '@/hooks/useTicketData';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import {
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MoreHorizontal } from 'react-feather';
import { useParams } from 'react-router-dom';

const ListTicket = () => {
  const { List, tickets } = useTicketData();
  const { id } = useParams();

  useEffect(() => {
    List(id as string);
  }, [List, id]);

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
          {tickets?.map((ticket) => (
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
