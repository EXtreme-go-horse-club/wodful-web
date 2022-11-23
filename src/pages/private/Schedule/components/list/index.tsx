import { IIsLiveDTO, IIsOverDTO } from '@/data/interfaces/schedule';
import useScheduleData from '@/hooks/useScheduleData';
import { formatDate } from '@/utils/formatDate';
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
import { ChevronLeft, ChevronRight, MoreHorizontal, Radio } from 'react-feather';

interface IListSchedule {
  championshipId: string;
}

const ListSchedule = ({ championshipId }: IListSchedule) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const {
    ListPaginated,
    schedulePages,
    page,
    limit,
    setLimit,
    setPage,
    isLoading,
    Delete,
    IsLive,
    IsOver,
  } = useScheduleData();

  useEffect(() => {
    if (championshipId) {
      ListPaginated(championshipId);
      setCurrentTotal(schedulePages.results?.length);
    }
  }, [ListPaginated, championshipId, schedulePages.results?.length]);

  const previousPage = () => {
    setPage(page - 1);
  };

  const handleIsLive = (scheduleId: string, toggleInit: boolean) => {
    const isLivePayload: IIsLiveDTO = {
      championshipId: championshipId,
      activityId: scheduleId,
      isLive: toggleInit,
    };

    IsLive(isLivePayload);
  };

  const handleIsOver = (scheduleId: string, toggleInit: boolean) => {
    const isOverPayload: IIsOverDTO = {
      championshipId: championshipId,
      activityId: scheduleId,
      isOver: toggleInit,
    };

    IsOver(isOverPayload);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const deleteResult = (id: string) => {
    Delete(id);
  };
  return (
    <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
      <Table variant='simple'>
        <Thead bg='gray.50' border='1px' borderColor='gray.100'>
          <Tr>
            <Th>
              <Text as='b'>DATA</Text>
            </Th>
            <Th>
              <Text as='b'>HORÁRIO</Text>
            </Th>
            <Th>
              <Text as='b'>CATEGORIA</Text>
            </Th>
            <Th>
              <Text as='b'>PROVA</Text>
            </Th>
            <Th>
              <Text as='b'>BATERIA</Text>
            </Th>
            <Th>
              <Text as='b'>BAIA</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {schedulePages.results?.map((schedule) => (
            <Tr bg={schedule.isOver ? 'gray.200' : ''} key={schedule.id}>
              <Td textTransform='capitalize'>
                <Text as={schedule.isOver ? 'del' : 'p'}>{formatDate(schedule.date)}</Text>
              </Td>

              <Td textTransform='capitalize'>
                <Text as={schedule.isOver ? 'del' : 'p'}>{schedule.hour}</Text>
              </Td>

              <Td textTransform='capitalize'>
                <Text as={schedule.isOver ? 'del' : 'p'}>{schedule.category.name}</Text>
              </Td>

              <Td textTransform='capitalize'>
                <Text as={schedule.isOver ? 'del' : 'p'}>{schedule.workout.name}</Text>
              </Td>

              <Td textTransform='capitalize'>
                <Text as={schedule.isOver ? 'del' : 'p'}>{schedule.heat}</Text>
              </Td>

              <Td>
                <Text as={schedule.isOver ? 'del' : 'p'}>{schedule.heat}</Text>
              </Td>
              <Td p={6}>
                <Flex justify='end' align='center'>
                  <Menu>
                    {schedule.isLive && (
                      <Tooltip label='Ao vivo' placement='top' hasArrow>
                        <Text p='0px 5px' fontSize='12px' color='red.500'>
                          <Radio />
                        </Text>
                      </Tooltip>
                    )}
                    <MenuButton
                      as={IconButton}
                      aria-label='Options'
                      icon={<MoreHorizontal />}
                      variant='none'
                    />
                    {/* 
                      isLive: 
                      - Não pode iniciar se já estiver iniciada.
                      - Não pode iniciar se já estiver Over.
                      - Só pode parar se estiver em live.
                      isOver
                      - Não pode encerrar se já estiver encerrado.
                      - 
                    */}
                    <MenuList>
                      {!schedule.isLive && !schedule.isOver && (
                        <>
                          <MenuItem onClick={() => handleIsLive(schedule.id, true)}>
                            Iniciar
                          </MenuItem>
                          <MenuItem onClick={() => deleteResult(schedule.id)}>Deletar</MenuItem>
                        </>
                      )}

                      {schedule.isLive && (
                        <>
                          <MenuItem onClick={() => handleIsLive(schedule.id, false)}>
                            Parar
                          </MenuItem>
                          <MenuItem onClick={() => handleIsOver(schedule.id, true)}>
                            Encerrar
                          </MenuItem>
                        </>
                      )}

                      {schedule.isOver && (
                        <>
                          <MenuItem onClick={() => handleIsOver(schedule.id, false)}>
                            Reabrir
                          </MenuItem>
                        </>
                      )}
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
                <option value='40'>40</option>
              </Select>
            </Th>
            <Th />
            <Th />
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

export default ListSchedule;
