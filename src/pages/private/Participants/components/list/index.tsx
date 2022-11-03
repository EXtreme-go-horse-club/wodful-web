import {
  Avatar,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MoreHorizontal } from 'react-feather';
import { mockData } from './mockdata';

const ListParticipants = () => {
  const [limit, setLimit] = useState();

  return (
    <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
      <Table variant='simple'>
        <Thead bg='gray.50' border='1px' borderColor='gray.100'>
          <Tr>
            <Th>
              <Text as='b'>Participante</Text>
            </Th>
            <Th>
              <Text as='b'>Time / Apelido</Text>
            </Th>
            <Th>
              <Text as='b'>Categoria</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockData.map((participant) => (
            <Tr key={participant.id}>
              <Td p={6}>
                <Wrap>
                  <WrapItem display='flex' justifyContent='center' alignItems='center' gap='16px'>
                    <Avatar name={participant.participantName} />
                    <Text>{participant.participantName}</Text>
                  </WrapItem>
                </Wrap>
              </Td>

              <Td p={6}>{participant.nickname}</Td>
              <Td p={6}>{participant.category}</Td>

              <Td p={6}>
                <Flex justify='end'>
                  <MoreHorizontal cursor='pointer' size={18} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
        {/* <Tfoot>
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
        </Tfoot> */}
      </Table>
    </TableContainer>
  );
};

export default ListParticipants;
