import {
  Box,
  Button,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const Category = () => {
  // async function handleUpload() {} onClick={() => this.handleUpload()}

  return (
    <Box bg='gray.100' w='100%' display='flex' flexDirection='column' alignItems='center' p='24px'>
      <HStack w='100%' justifyContent='space-between'>
        <Text fontSize='3xl'>Lista de categorias</Text>
        <Button colorScheme='teal' size='md'>
          Adicionar categoria
        </Button>
      </HStack>

      <Box w='100%'>
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Linhas por página</Th>
                <Th>nro</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Category;
