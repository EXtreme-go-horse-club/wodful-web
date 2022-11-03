import useParticipantData from '@/hooks/useParticipantData';
import {
  Avatar,
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
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'react-feather';
import { useParams } from 'react-router-dom';

interface listParticipants {
  participantName: string | null;
}

const ListParticipants = ({ participantName }: listParticipants) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const { ListPaginated, participantsPages, page, limit, setLimit, setPage, isLoading } =
    useParticipantData();

  const { id } = useParams();

  useEffect(() => {
    ListPaginated(id as string, participantName as string);

    setCurrentTotal(participantsPages.results?.length);
  }, [ListPaginated, id, participantName, participantsPages.results?.length]);

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
          {participantsPages.results?.map((participant) => (
            <Tr key={participant.id}>
              <Td p={6}>
                <Wrap>
                  <WrapItem display='flex' justifyContent='center' alignItems='center' gap='16px'>
                    <Avatar name={participant.name} />
                    <Text>{participant.name}</Text>
                  </WrapItem>
                </Wrap>
              </Td>

              <Td p={6}>{participant.nickname}</Td>
              <Td p={6}>{participant.category.name}</Td>

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
            <Th></Th>
            <Th></Th>
            <Th maxW='100px'>
              <Flex justify='end'>
                <HStack>
                  {page === 1 && (
                    <Text>
                      {page * limit - (limit - 1)} - {page * limit} de {participantsPages.count}
                    </Text>
                  )}

                  {page !== 1 && (
                    <Text>
                      {page * limit - (limit - 1)} - {page * limit - limit + currentTotal} de{' '}
                      {participantsPages.count}
                    </Text>
                  )}
                  <Tooltip label='Página anterior' placement='top' hasArrow>
                    <Button
                      disabled={!participantsPages.previous || isLoading}
                      variant='link'
                      onClick={previousPage}
                    >
                      <ChevronLeft
                        color={participantsPages.previous ? 'black' : 'gray'}
                        size={16}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip label='Próxima página' placement='top' hasArrow>
                    <Button
                      disabled={!participantsPages.next || isLoading}
                      variant='link'
                      onClick={nextPage}
                    >
                      <ChevronRight color={participantsPages.next ? 'black' : 'gray'} size={16} />
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

export default ListParticipants;
