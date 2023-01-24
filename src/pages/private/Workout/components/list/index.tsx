import ComponentModal from '@/components/ComponentModal';
import DeleteData from '@/components/Delete';
import useWorkoutData from '@/hooks/useWorkoutData';
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
  Tag,
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
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'react-feather';

interface IListWorkout {
  id: string;
}

const ListWorkout = ({ id }: IListWorkout) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const { ListPaginated, workoutsPages, page, limit, setLimit, setPage, isLoading, Delete } =
    useWorkoutData();

  const [workoutId, setWorkoutId] = useState<string>('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    ListPaginated(id);
    setCurrentTotal(workoutsPages.results?.length);
  }, [ListPaginated, id, workoutsPages.results?.length]);

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const openDelete = (id: string) => {
    setWorkoutId(id);
    onOpen();
  };

  const confirmDelete = () => {
    Delete(workoutId);
  };

  return (
    <>
      <ComponentModal modalHeader='Remover prova' size='sm' isOpen={isOpen} onClose={onClose}>
        <DeleteData onClose={onClose} removedData='a prova' confirmDelete={confirmDelete} />
      </ComponentModal>

      <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
        <Table variant='simple'>
          <Thead bg='gray.50' border='1px' borderColor='gray.100'>
            <Tr>
              <Th>
                <Text as='b'>PROVA</Text>
              </Th>
              <Th>
                <Text as='b'>TIPO</Text>
              </Th>
              <Th>
                <Text as='b'>CATEGORIA</Text>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {workoutsPages.results?.map((workout) => (
              <Tr key={workout.id}>
                <Td p={6}>{workout.name}</Td>
                <Td p={6}>
                  <Tag
                    size='md'
                    key='md'
                    variant='solid'
                    colorScheme={workout.workoutType == 'AMRAP' ? 'purple' : 'blue'}
                  >
                    {workout.workoutType}
                  </Tag>
                </Td>
                <Td p={6}>{workout.categoryName}</Td>
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
                        <MenuItem onClick={() => openDelete(workout.id)}>Deletar</MenuItem>
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
              <Th>
                <Flex justify='end'>
                  <HStack>
                    {page === 1 && (
                      <Text>
                        {page * limit - (limit - 1)} - {page * limit} de {workoutsPages.count}
                      </Text>
                    )}

                    {page !== 1 && (
                      <Text>
                        {page * limit - (limit - 1)} - {page * limit - limit + currentTotal} de{' '}
                        {workoutsPages.count}
                      </Text>
                    )}
                    <Tooltip label='Página anterior' placement='top' hasArrow>
                      <Button
                        disabled={!workoutsPages.previous || isLoading}
                        variant='link'
                        onClick={previousPage}
                      >
                        <ChevronLeft color={workoutsPages.previous ? 'black' : 'gray'} size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip label='Próxima página' placement='top' hasArrow>
                      <Button
                        disabled={!workoutsPages.next || isLoading}
                        variant='link'
                        onClick={nextPage}
                      >
                        <ChevronRight color={workoutsPages.next ? 'black' : 'gray'} size={16} />
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

export default ListWorkout;
