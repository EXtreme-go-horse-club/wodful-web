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
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { X } from 'react-feather';

import * as Yup from 'yup';

interface FormChampionshipProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChampionshipSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const FormChampionship = ({ isOpen, onClose }: FormChampionshipProps) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      startDate: '',
      endDate: '',
      accessCode: '',
      banner: '',
      resultType: '',
      address: '',
    },
    validationSchema: ChampionshipSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <VStack pt={4} pb={4} align='start' spacing='24px'>
        <HStack w='100%' align='start' justify='space-between'>
          <Heading as='h4' size='md'>
            Criar campeonato
          </Heading>

          <X onClick={onClose} cursor='pointer' size={18} />
        </HStack>

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
                placeholder='Nome do campeonato'
              />

              {!!formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
            </FormControl>

            <HStack>
              <FormControl alignItems='start'>
                <FormLabel m={0}>Data de início</FormLabel>
                <Input
                  as='input'
                  name='startDate'
                  id='startDate'
                  onChange={formik.handleChange}
                  value={formik.values.startDate}
                  type='datetime-local'
                  placeholder='DD/MM/AAAA'
                />
              </FormControl>

              <FormControl>
                <FormLabel m={0}>Data de encerramento</FormLabel>
                <Input
                  as='input'
                  name='endDate'
                  id='endDate'
                  onChange={formik.handleChange}
                  value={formik.values.endDate}
                  type='datetime-local'
                  placeholder='DD/MM/AAAA'
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel m={0}>Local</FormLabel>
              <Input
                as='input'
                name='address'
                id='address'
                onChange={formik.handleChange}
                value={formik.values.address}
                placeholder='Endereço'
              />
            </FormControl>

            <FormControl>
              <FormLabel m={0}>Código do campeonato</FormLabel>
              <Input
                as='input'
                name='accessCode'
                id='accessCode'
                onChange={formik.handleChange}
                value={formik.values.accessCode}
                placeholder='Código'
              />
            </FormControl>

            <FormControl>
              <FormLabel m={0}>Tipo de resultado</FormLabel>
              <Select
                name='resultType'
                id='resultType'
                onChange={formik.handleChange}
                value={formik.values.resultType}
                placeholder='Selecione o tipo'
              >
                <option value='SCORE'>Pontuação</option>
                <option value='RANKING'>Colocação</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel m={0}>Capa do campeonato</FormLabel>
              <Input
                as='input'
                name='banner'
                id='banner'
                onChange={formik.handleChange}
                value={formik.values.banner}
                p={1}
                type='file'
              />
            </FormControl>

            <ButtonGroup flexDirection='column' alignItems='end' gap='12px' w='100%'>
              <Button w='100%' disabled={!formik.isValid} colorScheme='teal' type='submit'>
                Adicionar
              </Button>
              <Button w='100%' variant='outline' onClick={onClose}>
                Fechar
              </Button>
            </ButtonGroup>
          </VStack>
        </form>
      </VStack>
    </>
  );
};

export default FormChampionship;
