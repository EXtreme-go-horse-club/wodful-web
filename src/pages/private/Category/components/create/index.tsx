import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from '@chakra-ui/react';

interface CreateModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const CreateCategory = ({ isOpen, onClose }: CreateModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar categoria</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input type='text' placeholder='Nome da categoria' />
            <FormLabel mt='24px'>Descrição</FormLabel>
            <Textarea placeholder='Descrição da categoria' />
            <FormLabel mt='24px'>Membros</FormLabel>
            <Select placeholder='Selecione o número de membros'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter display='flex' flexDirection='column'>
          <Button colorScheme='teal' w='100%'>
            Adicionar
          </Button>
          <Button variant='outline' w='100%' mt='12px' onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCategory;
