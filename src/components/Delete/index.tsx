import {
  Button,
  ButtonGroup,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';

interface IDelete {
    removedData: string;
    onClose: () => void;
    confirmDelete: () => void;
}

const DeleteData = ({ onClose, removedData, confirmDelete }: IDelete) => {
    const deleteData = () => {
        confirmDelete();
        onClose(); 
    };
  return (
      <VStack align='start' w='100%' spacing={6} pb={4} flexDirection='column'>
        <HStack w='100%' >
            <Text fontSize='14px'>
                Tem certeza que deseja remover {removedData}
            </Text>
        </HStack>
        <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
          <Button colorScheme='teal' w='100%' mt={4} onClick={deleteData}>
            Remover
          </Button>
        </ButtonGroup>
      </VStack>
  );
};

export default DeleteData;
