import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { X } from 'react-feather';
import * as Yup from 'yup';

interface CreateModalProps {
  onClose: () => void;
}

const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Insira um nome maior!')
    .max(50, 'Nome muito longo!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Descrição muito curta')
    .max(255, 'Descrição muito longa!')
    .required('Required'),
  members: Yup.number().required('Required'),
});

const CreateCategory = ({ onClose }: CreateModalProps) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      members: '',
    },
    validationSchema: CategorySchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <VStack pt={4} pb={4} align='start' spacing='24px'>
      <HStack w='100%' align='start' justify='space-between'>
        <Heading as='h4' size='md'>
          Criar campeonato
        </Heading>

        <X onClick={onClose} cursor='pointer' size={18} />
      </HStack>
      {/* <HStack w='100%' align='start'> */}
      <form onSubmit={formik.handleSubmit}>
        <VStack align='start' w='100%' flexDirection='column' gap='24px'>
          <FormControl isInvalid={!!formik.errors.name}>
            <FormLabel m={0}>Nome</FormLabel>
            <Input
              as='input'
              name='name'
              id='name'
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder='Nome da categoria'
            />

            {!!formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!formik.errors.description}>
            <FormLabel mt='24px'>Descrição</FormLabel>
            <Textarea
              placeholder='Descrição da categoria'
              as='textarea'
              name='description'
              id='description'
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </FormControl>
          <FormControl isInvalid={!!formik.errors.members}>
            <FormLabel mt='24px'>Membros</FormLabel>
            <Select
              as='select'
              name='members'
              id='members'
              onChange={formik.handleChange}
              placeholder='Selecione o número de membros'
              value={formik.values.members}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </Select>
          </FormControl>
          <ButtonGroup flexDirection='column' alignItems='end' gap='12px' w='100%'>
            <Button colorScheme='teal' w='100%' disabled={!formik.isValid} type='submit'>
              Adicionar
            </Button>
            <Button variant='outline' w='100%' mt='12px' onClick={onClose}>
              Fechar
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
      {/* </HStack> */}
    </VStack>

    // <ModalFooter display='flex' flexDirection='column'>
  );
};

export default CreateCategory;
