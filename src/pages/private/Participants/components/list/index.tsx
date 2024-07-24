import ComponentModal from '@/components/ComponentModal';
import DeleteData from '@/components/Delete';
import { IParticipant } from '@/data/interfaces/participant';
import useParticipantData from '@/hooks/useParticipantData';
import {
  Avatar,
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
  Wrap,
  WrapItem,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Info, MoreHorizontal } from 'react-feather';
import { useParams } from 'react-router-dom';

interface IListParticipants {
  participantOrTeamName: string | null;

  openModal: (whichOne: 'EDIT' | 'MEDAL' | 'KIT', participant: IParticipant) => void;
}

const ListParticipants = ({ participantOrTeamName, openModal }: IListParticipants) => {
  const { PatchMedal, PatchKit } = useParticipantData();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentTotal, setCurrentTotal] = useState<number>(0);
  const [idParticipant, setIdParticipant] = useState<string>('');
  const [whichModal, setWhichModal] = useState<'MEDAL' | 'KIT'>('MEDAL');

  const { ListPaginated, participantsPages, page, limit, setLimit, setPage, isLoading } =
    useParticipantData();

  const { id } = useParams();

  useEffect(() => {
    ListPaginated(id as string, participantOrTeamName as string);
  }, [ListPaginated, id, participantOrTeamName]);

  useEffect(() => {
    setCurrentTotal(participantsPages.results?.length);
  }, [participantsPages.results?.length]);

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const confirmDelete = () => {
    if (whichModal === 'MEDAL') PatchMedal(idParticipant, null, id!);
    if (whichModal === 'KIT') PatchKit(idParticipant, null, id!);
  };

  const openDelete = (idParticipant: string, whichOne: 'MEDAL' | 'KIT') => {
    setWhichModal(whichOne);
    setIdParticipant(idParticipant);
    onOpen();
  };

  return (
    <>
      <ComponentModal modalHeader='Desvincular' size='sm' isOpen={isOpen} onClose={onClose}>
        <DeleteData
          onClose={onClose}
          removedData={whichModal == 'MEDAL' ? 'a retirada de medalha' : 'a retirada de kit'}
          confirmDelete={confirmDelete}
        />
      </ComponentModal>

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
              <Th>
                <Text as='b'>Medalha</Text>
              </Th>
              <Th>
                <Text as='b'>Kit</Text>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {participantsPages.results?.length === 0 && (
              <Tr>
                <Td />
                <Td p={6} textAlign='center'>
                  Sem registro de participantes
                </Td>
                <Td />
                <Td />
                <Td />
              </Tr>
            )}
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
                  {participant.medalTakenBy ? (
                    <Tooltip label={participant.medalTakenBy} placement='top-start'>
                      <Text display='flex' alignItems='center' gap={2} cursor={'pointer'}>
                        Retirado
                        <Info color={'black'} size={16} />
                      </Text>
                    </Tooltip>
                  ) : (
                    'Aguardando'
                  )}
                </Td>
                <Td p={6}>
                  {participant.kitTakenBy ? (
                    <Tooltip label={participant.kitTakenBy} placement='top-start'>
                      <Text display='flex' alignItems='center' gap={2} cursor={'pointer'}>
                        Retirado
                        <Info color={'black'} size={16} />
                      </Text>
                    </Tooltip>
                  ) : (
                    'Aguardando'
                  )}
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
                        <MenuItem onClick={() => openModal('EDIT', participant)}>Editar</MenuItem>
                        <MenuItem
                          onClick={() =>
                            !participant.medalTakenBy
                              ? openModal('MEDAL', participant)
                              : openDelete(participant.id, 'MEDAL')
                          }
                        >
                          {!participant.medalTakenBy ? 'Retirar medalha' : 'Devolver medalha'}
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            !participant.kitTakenBy
                              ? openModal('KIT', participant)
                              : openDelete(participant.id, 'KIT')
                          }
                        >
                          {!participant.kitTakenBy ? 'Retirar kit' : 'Devolver kit'}
                        </MenuItem>
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
    </>
  );
};

export default ListParticipants;
