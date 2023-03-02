import ComponentModal from '@/components/ComponentModal';
import DeleteData from '@/components/Delete';
import { ICategory } from '@/data/interfaces/category';
import useCategoryData from '@/hooks/useCategoryData';
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
interface IListCategory {
  id: string;
  openEdit: (category: ICategory) => void;
}

const ListCategory = ({ id, openEdit }: IListCategory) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { ListPaginated, categoriesPages, page, limit, setLimit, setPage, isLoading, Delete } =
    useCategoryData();

  useEffect(() => {
    ListPaginated(id);
    setCurrentTotal(categoriesPages.results?.length);
  }, [ListPaginated, categoriesPages.results?.length, id]);

  const previousPage = () => {
    setPage(page - 1);
  };

  const openDelete = (id: string) => {
    setCategoryId(id);
    onOpen();
  };

  const confirmDelete = () => {
    Delete(categoryId);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <ComponentModal modalHeader='Remover categoria' size='sm' isOpen={isOpen} onClose={onClose}>
        <DeleteData onClose={onClose} removedData="a categoria" confirmDelete={confirmDelete}/>
      </ComponentModal>
      
      <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
        <Table variant='simple'>
          <Thead bg='gray.50' border='1px' borderColor='gray.100'>
            <Tr>
              <Th>
                <Text as='b'>Categoria</Text>
              </Th>
              <Th>
                <Text as='b'>Formato</Text>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {categoriesPages.results?.map((category) => (
              <Tr key={category.id}>
                <Td p={6}>{category.name}</Td>
                <Td p={6}>
                  <Tag
                    size='md'
                    key='md'
                    variant='solid'
                    colorScheme={category.isTeam ? 'teal' : 'blue'}
                  >
                    {category.isTeam ? 'Time' : 'Individual'}
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
                        <MenuItem onClick={() => openDelete(category.id)}>Deletar</MenuItem>
                        <MenuItem onClick={() => openEdit(category)}>Editar</MenuItem>
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
              <Th>
                <Flex justify='end'>
                  <HStack>
                    {page === 1 && (
                      <Text>
                        {page * limit - (limit - 1)} - {page * limit} de {categoriesPages.count}
                      </Text>
                    )}

                    {page !== 1 && (
                      <Text>
                        {page * limit - (limit - 1)} - {page * limit - limit + currentTotal} de{' '}
                        {categoriesPages.count}
                      </Text>
                    )}
                    <Tooltip label='Página anterior' placement='top' hasArrow>
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

export default ListCategory;
