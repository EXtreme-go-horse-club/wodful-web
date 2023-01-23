import ComponentModal from '@/components/ComponentModal';
import DeleteData from '@/components/Delete';
import useSubscriptionData from '@/hooks/useSubscriptionData';
import { subscriptionStatus } from '@/utils/messages';
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

interface IListSubscription {
  id: string;
}

const ListSubscription = ({ id }: IListSubscription) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const {
    ListPaginated,
    subscriptionsPages,
    page,
    limit,
    setLimit,
    setPage,
    isLoading,
    Delete,
    UpdateStatus,
  } = useSubscriptionData();

  const [subscriptionId, setSubscriptionId] = useState<string>('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    ListPaginated(id);
    setCurrentTotal(subscriptionsPages.results?.length);
  }, [ListPaginated, subscriptionsPages.results?.length, id]);

  const openDelete = (id: string) => {
    setSubscriptionId(id);
    onOpen();
  };

  const confirmDelete = () => {
    Delete(subscriptionId);
  };

  const changeSubscriptionStatus = (id: string, status: string) => {
    UpdateStatus(id, status);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <ComponentModal modalHeader='Remover inscrição' size='sm' isOpen={isOpen} onClose={onClose}>
        <DeleteData onClose={onClose} removedData="a inscrição" confirmDelete={confirmDelete}/>
      </ComponentModal>
      <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
        <Table variant='simple'>
          <Thead bg='gray.50' border='1px' borderColor='gray.100'>
            <Tr>
              <Th>
                <Text as='b'>RESPONSÁVEL</Text>
              </Th>
              <Th>
                <Text as='b'>PARTICIPANTE</Text>
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
            {subscriptionsPages.results?.map((subscription) => (
              <Tr key={subscription.id}>
                <Td p={6} textTransform='capitalize'>
                  {subscription.responsibleName}
                </Td>
                <Td p={6} textTransform='capitalize'>
                  {subscription.nickname}
                </Td>
                <Td p={6} textTransform='capitalize'>
                  {subscription.category.name}
                </Td>
                <Td p={6}>
                  <Tag
                    size='md'
                    key='md'
                    textTransform='capitalize'
                    variant='solid'
                    colorScheme={
                      subscription.status == 'APPROVED'
                        ? 'teal'
                        : subscription.status == 'DECLINED'
                        ? 'red'
                        : 'yellow'
                    }
                  >
                    {subscriptionStatus[subscription.status]}
                  </Tag>
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
                        <MenuItem
                          onClick={() => changeSubscriptionStatus(subscription.id, 'approve')}
                        >
                          Aprovar
                        </MenuItem>
                        <MenuItem
                          onClick={() => changeSubscriptionStatus(subscription.id, 'decline')}
                        >
                          Recusar
                        </MenuItem>
                        <MenuItem onClick={() => openDelete(subscription.id)}>
                          Deletar
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
              <Th />
              <Th />
              <Th />
              <Th>
                <Flex justify='end'>
                  <HStack>
                    {page === 1 && (
                      <Text>
                        {page * limit - (limit - 1)} - {page * limit} de {subscriptionsPages.count}
                      </Text>
                    )}

                    {page !== 1 && (
                      <Text>
                        {page * limit - (limit - 1)} - {page * limit - limit + currentTotal} de{' '}
                        {subscriptionsPages.count}
                      </Text>
                    )}
                    <Tooltip label='Página anterior' placement='top' hasArrow>
                      <Button
                        disabled={!subscriptionsPages.previous || isLoading}
                        variant='link'
                        onClick={previousPage}
                      >
                        <ChevronLeft
                          color={subscriptionsPages.previous ? 'black' : 'gray'}
                          size={16}
                        />
                      </Button>
                    </Tooltip>
                    <Tooltip label='Próxima página' placement='top' hasArrow>
                      <Button
                        disabled={!subscriptionsPages.next || isLoading}
                        variant='link'
                        onClick={nextPage}
                      >
                        <ChevronRight color={subscriptionsPages.next ? 'black' : 'gray'} size={16} />
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

export default ListSubscription;
