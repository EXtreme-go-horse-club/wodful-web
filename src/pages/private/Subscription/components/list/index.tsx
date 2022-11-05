import useSubscriptionData from '@/hooks/useSubscriptionData';
import {
  Flex,
  HStack,
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
import { useEffect, useState } from 'react';
import { MoreHorizontal } from 'react-feather';
interface IListSubscription {
  id: string;
}

const ListSubscription = ({ id }: IListSubscription) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const { ListPaginated, subscriptionsPages, page, limit, setLimit, setPage, isLoading } =
    useSubscriptionData();

  useEffect(() => {
    ListPaginated(id);
    setCurrentTotal(subscriptionsPages.results?.length);
  }, [ListPaginated, subscriptionsPages.results?.length, id]);

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
              <Text as='b'>RESPONSÁVEL</Text>
            </Th>
            <Th>
              {/* APLICAR LOGICA DEPENDENDO DO TICKET */}
              <Text as='b'>TIME/APELIDO</Text>
            </Th>
            <Th>
              <Text as='b'>CATEGORIA</Text>
            </Th>
            <Th>
              <Text as='b'>STATUS</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td p={6}>Segun Sue</Td>
            <Td p={6}>Frangos</Td>
            <Td p={6}>Fitness-Masculino</Td>
            <Td p={6}>
              <Tag
                size='md'
                key='md'
                variant='solid'
                colorScheme='teal'
                // colorScheme={category.isTeam ? 'teal' : 'yellow'}
              >
                INSCRIÇÃO PAGA
              </Tag>
            </Td>
            <Td p={6}>
              <Flex justify='end'>
                <MoreHorizontal cursor='pointer' size={18} />
              </Flex>
            </Td>
          </Tr>
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
            <Th>
              <Flex justify='end'>
                <HStack>
                  <Text>PAGINACAO</Text>
                  {/* {page === 1 && (
                    <Text>
                      {page * limit - (limit - 1)} - {page * limit} de {subscriptionPages.count}
                    </Text>
                  )}

                  {page !== 1 && (
                    <Text>
                      {page * limit - (limit - 1)} - {page * limit - limit + currentTotal} de{' '}
                      {categoriesPages.count}
                    </Text>
                  )} */}
                  {/* <Tooltip label='Página anterior' placement='top' hasArrow>
                    <Button
                      disabled={!categoriesPages.previous || isLoading}
                      variant='link'
                      onClick={previousPage}
                    >
                      <ChevronLeft color={categoriesPages.previous ? 'black' : 'gray'} size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip label='Próxima página' placement='top' hasArrow>
                    <Button
                      disabled={!categoriesPages.next || isLoading}
                      variant='link'
                      onClick={nextPage}
                    >
                      <ChevronRight color={categoriesPages.next ? 'black' : 'gray'} size={16} />
                    </Button>
                  </Tooltip> */}
                </HStack>
              </Flex>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default ListSubscription;
