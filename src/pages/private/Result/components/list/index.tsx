import ComponentModal from '@/components/ComponentModal';
import DeleteData from '@/components/Delete';
import useResultData from '@/hooks/useResultData';
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MoreHorizontal } from 'react-feather';

interface IListResultProps {
  openEdit: (id: string) => void;
  categoryId: string;
  clearFilter: () => void;
}

const ListResults = ({ openEdit, categoryId, clearFilter }: IListResultProps) => {
  const { resultPages, Delete } = useResultData();
  const [resultId, setResultId] = useState<string>('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openDelete = (id: string) => {
    setResultId(id);
    onOpen();
  };

  const confirmDelete = () => {
    clearFilter();
    Delete(resultId, categoryId);
  };

  return (
    <>
      <ComponentModal modalHeader='Remover resultado' size='sm' isOpen={isOpen} onClose={onClose}>
        <DeleteData onClose={onClose} removedData='o resultado' confirmDelete={confirmDelete} />
      </ComponentModal>
      <TableContainer border='1px' borderColor='gray.100' fontSize='sm' color='#2D3748'>
        <Table variant='simple'>
          <Thead bg='gray.50' border='1px' borderColor='gray.100'>
            <Tr>
              <Th>
                <Text as='b'>PARTICIPANTES</Text>
              </Th>
              <Th>
                <Text as='b'>PROVA</Text>
              </Th>
              <Th>
                <Text as='b'>RESULTADO</Text>
              </Th>
              <Th>
                <Text as='b'>COLOCAÇÃO</Text>
              </Th>
              <Th>
                <Text as='b'>PONTOS</Text>
              </Th>
              <Th>
                <Text as='b'>STATUS</Text>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {resultPages.length === 0 && (
              <Tr>
                <Td />
                <Td />
                <Td p={6} textAlign='center'>
                  Busque por uma categoria
                </Td>
              </Tr>
            )}
            {resultPages?.map((result) => (
              <Tr key={result.id}>
                <Td p={6} textTransform='capitalize'>
                  {result.nickname}
                </Td>
                <Td p={6}>{result.workout.name}</Td>
                <Td p={6}>{result.result}</Td>
                <Td p={6}>{result.classification}° Lugar</Td>
                <Td p={6}>
                  {Number(result.points) === 0
                    ? 'Sem pontuação'
                    : `${Number(result.points)} ${
                        Number(result.points) === 1 ? 'Ponto' : 'Pontos'
                      }`}
                </Td>
                <Td p={6}>
                  {result.isReleased ? (
                    <Tag size='md' key='md' variant='solid' colorScheme={'teal'}>
                      LIBERADO
                    </Tag>
                  ) : (
                    <Tag size='sm' key='md' variant='solid' colorScheme={'gray'}>
                      OCULTO
                    </Tag>
                  )}
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
                        <MenuItem onClick={() => openEdit(result.id)}>Editar</MenuItem>
                        <MenuItem onClick={() => openDelete(result.id)}>Deletar</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListResults;
