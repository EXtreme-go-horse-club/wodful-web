import ComponentModal from '@/components/ComponentModal';
import DeleteData from '@/components/Delete';
import useSubscriptionData from '@/hooks/useSubscriptionData';
import { formatDate } from '@/utils/formatDate';
import { subscriptionStatus } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
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
  VStack,
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
  categoryId: string;
  onEdit: (subscriptionId: string) => void;
}

const ListSubscription = ({ id, categoryId, onEdit }: IListSubscription) => {
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
    ResendApprovedEmail,
  } = useSubscriptionData();

  const [subscriptionId, setSubscriptionId] = useState<string>('');

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isResendOpen,
    onOpen: onResendOpen,
    onClose: onResendClose,
  } = useDisclosure();

  useEffect(() => {
    ListPaginated(id, categoryId);
  }, [ListPaginated, id, categoryId]);

  useEffect(() => {
    setCurrentTotal(subscriptionsPages.results?.length);
  }, [subscriptionsPages.results?.length]);

  const openDelete = (id: string) => {
    setSubscriptionId(id);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    Delete(subscriptionId);
  };

  const changeSubscriptionStatus = (id: string, status: string) => {
    UpdateStatus(id, status);
  };

  const openResendEmail = (id: string) => {
    setSubscriptionId(id);
    onResendOpen();
  };

  const confirmResendEmail = () => {
    ResendApprovedEmail(subscriptionId);
    onResendClose();
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <ComponentModal
        modalHeader='Remover inscrição'
        size='sm'
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      >
        <DeleteData onClose={onDeleteClose} removedData='a inscrição' confirmDelete={confirmDelete} />
      </ComponentModal>
      <ComponentModal
        modalHeader='Reenviar e-mail'
        size='sm'
        isOpen={isResendOpen}
        onClose={onResendClose}
      >
        <VStack align='start' w='100%' spacing={6} pb={4} flexDirection='column'>
          <HStack w='100%'>
            <Text fontSize='14px'>
              Deseja reenviar o e-mail de confirmação para o responsável desta inscrição?
            </Text>
          </HStack>
          <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
            <Button colorScheme='teal' w='100%' onClick={confirmResendEmail}>
              Reenviar e-mail
            </Button>
            <Button variant='outline' w='100%' onClick={onResendClose}>
              Cancelar
            </Button>
          </ButtonGroup>
        </VStack>
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
              <Th>
                <Text as='b'>CRIADA EM</Text>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {subscriptionsPages.results?.length === 0 && (
              <Tr>
                <Td />
                <Td />
                <Td p={6}>Busque por uma categoria</Td>
                <Td />
                <Td />
                <Td />
              </Tr>
            )}
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
                <Td p={6}>{formatDate(subscription.createdAt, 'dd/MM/yyyy HH:mm')}</Td>
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
                        <MenuItem onClick={() => onEdit(subscription.id)}>Editar</MenuItem>
                        {subscription.status === 'APPROVED' && (
                          <MenuItem onClick={() => openResendEmail(subscription.id)}>
                            Reenviar e-mail
                          </MenuItem>
                        )}
                        <MenuItem onClick={() => openDelete(subscription.id)}>Deletar</MenuItem>
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
                        <ChevronRight
                          color={subscriptionsPages.next ? 'black' : 'gray'}
                          size={16}
                        />
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
