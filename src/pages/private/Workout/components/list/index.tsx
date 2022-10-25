import useWorkoutData from '@/hooks/useWorkoutData';
import {
  Flex,
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
  Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MoreHorizontal } from 'react-feather';

const ListWorkout = () => {
  const { List, workouts } = useWorkoutData();
  useEffect(() => {
    List('47e3b328-de59-4725-a5d8-82b40b9b9a2a');
  }, [List]);

  return (
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
          {workouts?.map((workout) => (
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
              <Flex justify='end'>1-5 de 32</Flex>{' '}
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default ListWorkout;
