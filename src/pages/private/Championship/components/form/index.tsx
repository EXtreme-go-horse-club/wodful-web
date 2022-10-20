import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { X } from 'react-feather';

interface FormChampionshipProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormChampionship = ({ isOpen, onClose }: FormChampionshipProps) => {
  // https://www.youtube.com/watch?v=4j6QiEbBoS0&t=189s&ab_channel=LesterFernandez
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
    onSubmit: (values: any, actions: any) => {
      console.log(JSON.stringify(values, null, 2));
      actions.resetForm();
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

        <VStack>
          <VStack align='start' w='100%' flexDirection='column' gap='24px'>
            <FormControl>
              <FormLabel m={0}>Nome</FormLabel>
              <Input
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder='Nome do campeonato'
              />
            </FormControl>

            <HStack>
              <FormControl alignItems='start'>
                <FormLabel m={0}>Data de início</FormLabel>
                <Input
                  name='startDate'
                  type='datetime-local'
                  onChange={formik.handleChange}
                  value={formik.values.startDate}
                  placeholder='DD/MM/AAAA'
                />
              </FormControl>

              <FormControl>
                <FormLabel m={0}>Data de encerramento</FormLabel>
                <Input
                  name='endDate'
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
                name='address'
                onChange={formik.handleChange}
                value={formik.values.address}
                placeholder='Endereço'
              />
            </FormControl>

            <FormControl>
              <FormLabel m={0}>Código do campeonato</FormLabel>
              <Input
                name='accessCode'
                onChange={formik.handleChange}
                value={formik.values.accessCode}
                placeholder='Código'
              />
            </FormControl>

            <FormControl>
              <FormLabel m={0}>Tipo de resultado</FormLabel>
              <Select
                name='resultType'
                value={formik.values.resultType}
                onChange={formik.handleChange}
                placeholder='Selecione o tipo'
              >
                <option value='SCORE'>Pontuação</option>
                <option value='RANKING'>Colocação</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel m={0}>Capa do campeonato</FormLabel>
              <Input name='banner' value={formik.values.banner} p={1} type='file' />
            </FormControl>

            <ButtonGroup flexDirection='column' alignItems='end' gap='12px' w='100%'>
              <Button w='100%' colorScheme='teal' type='submit'>
                Adicionar
              </Button>
              <Button w='100%' variant='outline' onClick={onClose}>
                Fechar
              </Button>
            </ButtonGroup>
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};

export default FormChampionship;
