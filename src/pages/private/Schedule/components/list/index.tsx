import { formatDate, formatHour } from '@/utils/formatDate';
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ChevronDown, MoreHorizontal, Zap } from 'react-feather';
import { mockData } from './mockdata';

const Listchedule = () => {
  const deleteResult = (id: string) => {
    console.log(id);
  };
  return (
    <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
      <Table variant='simple'>
        <Thead bg='gray.50' border='1px' borderColor='gray.100'>
          <Tr>
            <Th></Th>
            <Th px={1}>
              <Text as='b'>DATA</Text>
            </Th>
            <Th px={1}>
              <Text as='b'>HORÁRIO</Text>
            </Th>
            <Th px={1}>
              <Text as='b'>CATEGORIA</Text>
            </Th>
            <Th px={1}>
              <Text as='b'>PROVA</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockData?.map((result) => (
            <Tr key={result.id}>
              <Td>
                <ChevronDown cursor='pointer' />
              </Td>

              <Td py={6} px={1} textTransform='capitalize'>
                {formatDate(result.startDate)}
              </Td>
              <Td py={6} px={1} textTransform='capitalize'>
                {formatHour(result.startDate)}
              </Td>

              <Td py={6} px={1} textTransform='capitalize'>
                {result.category.name}
              </Td>
              <Td py={6} px={1} textTransform='capitalize'>
                {result.workout.name}
              </Td>
              <Td py={6} px={1}>
                <Flex justify='end' alignItems='center' gap='20px'>
                  <Zap
                    size={16}
                    onClick={() => result.isLive!}
                    cursor='pointer'
                    fill={result.isLive ? 'red' : 'white'}
                  />

                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label='Options'
                      icon={<MoreHorizontal />}
                      variant='none'
                    />
                    <MenuList>
                      <MenuItem onClick={() => deleteResult(result.id)}>Deletar</MenuItem>
                    </MenuList>
                  </Menu>
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
            <Th />
            <Th />
            <Th />
            <Th>
              <Flex justify='end'>
                <HStack>
                  {page === 1 && (
                    <Text>
                      {page * limit - (limit - 1)} - {page * limit} de {resultPages.count}
                    </Text>
                  )}

                  {page !== 1 && (
                    <Text>
                      {page * limit - (limit - 1)} - {page * limit - limit + currentTotal} de{' '}
                      {resultPages.count}
                    </Text>
                  )}
                  <Tooltip label='Página anterior' placement='top' hasArrow>
                    <Button
                      disabled={!resultPages.previous || isLoading}
                      variant='link'
                      onClick={previousPage}
                    >
                      <ChevronLeft color={resultPages.previous ? 'black' : 'gray'} size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip label='Próxima página' placement='top' hasArrow>
                    <Button
                      disabled={!resultPages.next || isLoading}
                      variant='link'
                      onClick={nextPage}
                    >
                      <ChevronRight color={resultPages.next ? 'black' : 'gray'} size={16} />
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

export default Listchedule;
