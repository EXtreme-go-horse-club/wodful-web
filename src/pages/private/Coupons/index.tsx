import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import useCoupon from '@/hooks/useCoupon';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Switch,
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
  useDisclosure,
} from '@chakra-ui/react';
import { MoreHorizontal } from 'react-feather';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { ICoupon } from '@/data/interfaces/coupon';

const Coupons = () => {
  const { id } = useParams();
  const {
    couponsPages,
    ListPaginated,
    Create,
    Update,
    Delete,
    isLoading,
    limit,
    setLimit,
    page,
    setPage,
  } = useCoupon();

  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE');
  const [value, setValue] = useState('');
  const [maxRedemptions, setMaxRedemptions] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCoupon, setEditingCoupon] = useState<ICoupon | null>(null);

  useEffect(() => {
    if (id) {
      ListPaginated(id);
    }
  }, [id, ListPaginated]);

  useEffect(() => {
    setCurrentTotal(couponsPages.results?.length ?? 0);
  }, [couponsPages.results?.length]);

  if (!id) return null;

  const hasElements = useMemo(
    () => (couponsPages.count ?? 0) > 0,
    [couponsPages.count],
  );

  const previousPage = useCallback(() => {
    setPage(page - 1);
  }, [page, setPage]);

  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  const resetForm = () => {
    setCode('');
    setDescription('');
    setValue('');
    setMaxRedemptions('');
    setType('PERCENTAGE');
  };

  const handleSubmit = async () => {
    if (!code || !value) return;

    const payload = {
      code: code.toUpperCase().trim(),
      description,
      type,
      value: Number(value),
      maxRedemptions: maxRedemptions ? Number(maxRedemptions) : null,
      championshipId: id,
    };

    if (editingCoupon) {
      await Update(editingCoupon.id, payload);
    } else {
      await Create(payload);
    }

    resetForm();
    setEditingCoupon(null);
    onClose();
  };

  const openCreate = () => {
    resetForm();
    setEditingCoupon(null);
    onOpen();
  };

  const openEdit = (coupon: ICoupon) => {
    setEditingCoupon(coupon);
    setCode(coupon.code.toUpperCase());
    setDescription(coupon.description || '');
    setType(coupon.type);
    setValue(String(coupon.value));
    setMaxRedemptions(coupon.maxRedemptions ? String(coupon.maxRedemptions) : '');
    onOpen();
  };

  return (
    <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
      <Flex w='100%' justifyContent='space-between'>
        {hasElements && (
          <>
            <Text fontSize='2xl' as='b'>
              Gestão de cupons
            </Text>
            <Button colorScheme='teal' size='md' onClick={openCreate}>
              Adicionar cupom
            </Button>
          </>
        )}
      </Flex>

      <ComponentModal
        modalHeader={editingCoupon ? 'Editar cupom' : 'Adicionar cupom'}
        size='lg'
        isOpen={isOpen}
        onClose={onClose}
      >
        <Box as='form' display='flex' flexDirection='column' gap={4} pb={4}>
          <FormControl mb={4}>
              <FormLabel>Código</FormLabel>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder='CUPOM10'
              />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Descrição</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Lote promocional'
            />
          </FormControl>
          <Flex mb={4} gap={4} flexWrap='wrap'>
            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value as 'PERCENTAGE' | 'FIXED')}
              >
                <option value='PERCENTAGE'>Porcentagem (%)</option>
                <option value='FIXED'>Valor fixo</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>{type === 'PERCENTAGE' ? 'Valor (%)' : 'Valor (R$)'}</FormLabel>
              <Input
                type='number'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel>Qtd. máxima (opcional)</FormLabel>
            <Input
              type='number'
              value={maxRedemptions}
              onChange={(e) => setMaxRedemptions(e.target.value)}
            />
          </FormControl>
          <Button colorScheme='teal' onClick={handleSubmit} isLoading={isLoading} mt={4}>
            {editingCoupon ? 'Salvar alterações' : 'Criar cupom'}
          </Button>
        </Box>
      </ComponentModal>

      {!hasElements && (
        <EmptyList
          text='Você não possui cupons ainda!'
          contentButton='Crie um cupom'
          onClose={openCreate}
        />
      )}

      {hasElements && (
        <Box w='100%' marginTop={6}>
          <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
            <Table variant='simple'>
              <Thead bg='gray.50' border='1px' borderColor='gray.100'>
                <Tr>
                  <Th>
                    <Text as='b'>Código</Text>
                  </Th>
                  <Th>
                    <Text as='b'>Descrição</Text>
                  </Th>
                  <Th>
                    <Text as='b'>Tipo</Text>
                  </Th>
                  <Th isNumeric>
                    <Text as='b'>Valor</Text>
                  </Th>
                  <Th isNumeric>
                    <Text as='b'>Qtd. máx.</Text>
                  </Th>
                  <Th>
                    <Text as='b'>Ativo</Text>
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {couponsPages.results?.map((coupon) => (
                  <Tr key={coupon.id}>
                    <Td p={6}>{coupon.code}</Td>
                    <Td p={6}>{coupon.description}</Td>
                    <Td p={6}>{coupon.type === 'PERCENTAGE' ? 'Porcentagem' : 'Fixo'}</Td>
                    <Td isNumeric p={6}>
                      {Number(coupon.value).toString()}
                    </Td>
                    <Td isNumeric p={6}>
                      {coupon.maxRedemptions ?? '-'}
                    </Td>
                    <Td p={6}>
                      <Switch
                        isChecked={coupon.isActive}
                        onChange={() =>
                          Update(coupon.id, {
                            isActive: !coupon.isActive,
                            championshipId: coupon.championshipId,
                          })
                        }
                      />
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
                            <MenuItem onClick={() => openEdit(coupon)}>Editar</MenuItem>
                            <MenuItem
                              onClick={() => Delete(coupon.id, coupon.championshipId)}
                            >
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
                      value={limit}
                      onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1);
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
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
                            {page * limit - (limit - 1)} -{' '}
                            {Math.min(page * limit, couponsPages.count ?? 0)} de{' '}
                            {couponsPages.count ?? 0}
                          </Text>
                        )}
                        {page !== 1 && (
                          <Text>
                            {page * limit - (limit - 1)} -{' '}
                            {page * limit - limit + currentTotal} de{' '}
                            {couponsPages.count ?? 0}
                          </Text>
                        )}
                        <Tooltip label='Página anterior' placement='top' hasArrow>
                          <Button
                            disabled={!couponsPages.previous || isLoading}
                            variant='link'
                            onClick={previousPage}
                          >
                            <ChevronLeft
                              color={couponsPages.previous ? 'black' : 'gray'}
                              size={16}
                            />
                          </Button>
                        </Tooltip>
                        <Tooltip label='Próxima página' placement='top' hasArrow>
                          <Button
                            disabled={!couponsPages.next || isLoading}
                            variant='link'
                            onClick={nextPage}
                          >
                            <ChevronRight
                              color={couponsPages.next ? 'black' : 'gray'}
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
        </Box>
      )}
    </Box>
  );
};

export default Coupons;

