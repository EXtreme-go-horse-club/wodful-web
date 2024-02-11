import { IParticipant } from '@/data/interfaces/participant';
import useParticipantData from '@/hooks/useParticipantData';
import { isValidDocument } from '@/utils/documentVerification';
import { validationMessages } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface EditModalProps {
  oldParticipant?: IParticipant;
  onClose: () => void;
}

const FormParticipant = ({ onClose, oldParticipant }: EditModalProps) => {
  const { id } = useParams();
  const { Edit } = useParticipantData();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IParticipant>({
    mode: 'onChange',
    defaultValues: {
      affiliation: oldParticipant?.affiliation,
      city: oldParticipant?.city,
      id: oldParticipant?.id,
      identificationCode: oldParticipant?.identificationCode,
      name: oldParticipant?.name,
      tShirtSize: oldParticipant?.tShirtSize,
    },
  });

  function onSubmit(participant: IParticipant) {
    Edit(participant, id!);
    onClose();
  }

  const formatDocument = (document: string) => {
    document = document.replace(/[^0-9]/g, '').trim();
    setValue(`identificationCode`, document);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack w='100%' spacing={6} pb={6} flexDirection='column'>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor='name' mb={2}>
            Nome
          </FormLabel>
          <Input
            as='input'
            id='name'
            placeholder='Nome do participante'
            {...register('name', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
            })}
          />

          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <HStack width='100%' align='baseline' gap={4}>
          <FormControl isInvalid={!!errors.identificationCode}>
            <FormLabel htmlFor='identificationCode' mb={2}>
              Documento
            </FormLabel>
            <Input
              as='input'
              id='identificationCode'
              placeholder='Informe o CPF'
              {...register('identificationCode', {
                required: validationMessages['required'],
                minLength: { value: 9, message: validationMessages['minLength'] },
                maxLength: { value: 20, message: validationMessages['maxLengthSm'] },
                validate: (value) => isValidDocument(value) || validationMessages['invalidCode'],
                onChange(event) {
                  formatDocument(event.target.value);
                },
              })}
            />

            <FormErrorMessage>
              {errors.identificationCode && errors.identificationCode.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.tShirtSize} w='50%'>
            <FormLabel htmlFor='tShirtSize' mb={2}>
              Camiseta
            </FormLabel>
            <Input
              as='input'
              id='tShirtSize'
              placeholder='Tamanho'
              {...register('tShirtSize', {
                required: validationMessages['required'],
                minLength: { value: 1, message: validationMessages['minLength'] },
                maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
              })}
            />

            <FormErrorMessage>{errors.tShirtSize && errors.tShirtSize.message}</FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack width='100%' align='baseline' gap={4}>
          <FormControl isInvalid={!!errors.city}>
            <FormLabel htmlFor='city' mb={2}>
              Cidade
            </FormLabel>
            <Input
              as='input'
              id='city'
              placeholder='Cidade do participante'
              {...register('city', {
                required: validationMessages['required'],
                minLength: { value: 4, message: validationMessages['minLength'] },
                maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
              })}
            />

            <FormErrorMessage>{errors.city && errors.city.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.affiliation}>
            <FormLabel htmlFor='affiliation' mb={2}>
              Box
            </FormLabel>
            <Input
              as='input'
              id='affiliation'
              placeholder='Box do participante'
              {...register('affiliation', {
                required: validationMessages['required'],
                minLength: { value: 3, message: validationMessages['minLength'] },
                maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
              })}
            />

            <FormErrorMessage>{errors.affiliation && errors.affiliation.message}</FormErrorMessage>
          </FormControl>
        </HStack>
      </VStack>
      <ButtonGroup
        backgroundColor={'white'}
        flexDirection='column'
        alignItems='end'
        gap={6}
        w='100%'
        position='sticky'
        bottom={0}
      >
        <Button colorScheme='teal' w='100%' mt={4} mb={4} type='submit' disabled={!isValid}>
          Editar
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormParticipant;
