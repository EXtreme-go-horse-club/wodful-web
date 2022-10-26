import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

interface CreateModalProps {
  onClose: () => void;
}

const FormTicket = ({ onClose }: CreateModalProps) => {
  const { id } = useParams();

  return (
    <form>
      <VStack align='start' w='100%' spacing={6} pb={6} flexDirection='column'>
        <FormControl>
          <FormLabel htmlFor='name'>Categoria</FormLabel>
          <Select as='select' id='category' placeholder='Selecione a categoria'>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input placeholder='Nome do ticket' id='name' />
        </FormControl>

        <FormControl>
          <FormLabel>Descrição</FormLabel>
          <Textarea placeholder='Descrição do ticket' as='textarea' id='description' />
        </FormControl>

        <HStack>
          <FormControl>
            <FormLabel>Valor</FormLabel>
            <Input placeholder='Valor do ticket' />
          </FormControl>

          <FormControl>
            <FormLabel>Quantidade máxima</FormLabel>
            <Input placeholder='Quantidade de tickets' />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Data de início</FormLabel>
            <Input type='datetime-local' placeholder='DD/MM/AAAA' />
          </FormControl>

          <FormControl>
            <FormLabel>Data de encerramento</FormLabel>
            <Input type='datetime-local' placeholder='DD/MM/AAAA' />
          </FormControl>
        </HStack>

        <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
          <Button colorScheme='teal' w='100%' mt={4} type='submit'>
            Adicionar
          </Button>
          <Button variant='outline' w='100%' onClick={onClose}>
            Fechar
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default FormTicket;
