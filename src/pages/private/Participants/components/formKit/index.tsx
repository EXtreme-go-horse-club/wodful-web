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

interface EditKitProps {
  idParticipant: string;
  onClose: () => void;
}

const FormKit = ({ onClose, idParticipant }: EditKitProps) => {
  const { id } = useParams();
  const { PatchKit } = useParticipantData();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ kitTakenBy: string }>({
    mode: 'onChange',
  });

  function onSubmit(form: { kitTakenBy: string }) {
    PatchKit(idParticipant, form.kitTakenBy, id!);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack w='100%' spacing={6} pb={6} flexDirection='column'>
        <FormControl isInvalid={!!errors.kitTakenBy}>
          <FormLabel htmlFor='kitTakenBy' mb={2}>
            Nome
          </FormLabel>
          <Input
            as='input'
            id='kitTakenBy'
            placeholder='Nome de quem vai retirar'
            {...register('kitTakenBy', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 250, message: validationMessages['maxLengthSm'] },
            })}
          />

          <FormErrorMessage>{errors.kitTakenBy && errors.kitTakenBy.message}</FormErrorMessage>
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

export default FormKit;
