import useParticipantData from '@/hooks/useParticipantData';
import { validationMessages } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface EditMedalProps {
  idParticipant: string;
  onClose: () => void;
}

const FormMedal = ({ onClose, idParticipant }: EditMedalProps) => {
  const { id } = useParams();
  const { PatchMedal } = useParticipantData();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ medalTakenBy: string }>({
    mode: 'onChange',
  });

  function onSubmit(form: { medalTakenBy: string }) {
    PatchMedal(idParticipant, form.medalTakenBy, id!);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack w='100%' spacing={6} pb={6} flexDirection='column'>
        <FormControl isInvalid={!!errors.medalTakenBy}>
          <FormLabel htmlFor='medalTakenBy' mb={2}>
            Nome
          </FormLabel>
          <Input
            as='input'
            id='medalTakenBy'
            placeholder='Nome de quem vai retirar'
            {...register('medalTakenBy', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 250, message: validationMessages['maxLengthSm'] },
            })}
          />

          <FormErrorMessage>{errors.medalTakenBy && errors.medalTakenBy.message}</FormErrorMessage>
        </FormControl>
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
          Salvar
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormMedal;
