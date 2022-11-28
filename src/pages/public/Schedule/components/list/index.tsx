import useScheduleData from '@/hooks/useScheduleData';
import { formatDate } from '@/utils/formatDate';
import {
  HStack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ArrowDown } from 'react-feather';
import '../lists.css';

const ListTablePublicSchedule = () => {
  const { schedules } = useScheduleData();

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
          </Tr>
        </Thead>
        <Tbody>
          {schedules?.map((schedule) => (
            <Tr key={schedule.id}>
              <Td p={6}>
                <HStack>
                  <ArrowDown size={16} /> <Text> {formatDate(`${schedule.date}`)}</Text>
                </HStack>
              </Td>
              <Td p={6}>
                <HStack>
                  <Text> {schedule.hour}</Text>
                </HStack>
              </Td>
              <Td p={6}>
                <Tag size='md' key='md' variant='solid' colorScheme='teal'>
                  {schedule.category.name}
                </Tag>
              </Td>
              <Td p={6}>{schedule.workout.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ListTablePublicSchedule;
