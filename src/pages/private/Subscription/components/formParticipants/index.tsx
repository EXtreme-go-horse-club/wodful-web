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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface CreateModalProps {
  id: string;
}

const FormSubscriptionParticipants = ({ id }: CreateModalProps) => {
  const [indexes, setIndexes] = useState<number[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    for (let index = 0; index < 4; index++) {
      setIndexes((indexes) => [...indexes, index]);
    }
  }, []);

  function onSubmit(subscription: any) {
    console.log(subscription);
    // subscription.championshipId = id;
    // Create(subscription);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {indexes.map((index) => {
        const participants = `participants[${index}]`;
        return (
          <VStack
            key={index}
            align='start'
            w='100%'
            spacing={6}
            pt={6}
            pb={6}
            flexDirection='column'
          >
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor={`${participants}.name`} m={0}>
                Atleta {index}
              </FormLabel>
              <Input
                as='input'
                id={`${participants}.name`}
                placeholder='Nome do participante'
                {...register(`${participants}.name`, {
                  required: validationMessages['required'],
                })}
              />

              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <HStack>
              <FormControl isInvalid={!!errors.identificationCode} w='50%'>
                <FormLabel htmlFor={`${participants}.identificationCode`} m={0}>
                  Documento
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.identificationCode`}
                  placeholder='Informe o RG ou CPF'
                  {...register(`${participants}.identificationCode`, {
                    required: validationMessages['required'],
                  })}
                />

                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.tShirtSize} w='50%'>
                <FormLabel htmlFor={`${participants}.tShirtSize`} m={0}>
                  Camiseta
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.tShirtSize`}
                  placeholder='Tamanho'
                  {...register(`${participants}.tShirtSize`, {
                    required: validationMessages['required'],
                  })}
                />

                <FormErrorMessage></FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isInvalid={!!errors.city}>
                <FormLabel htmlFor={`${participants}.city`} m={0}>
                  Cidade
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.city`}
                  placeholder='Cidade do participante'
                  {...register(`${participants}.city`, {
                    required: validationMessages['required'],
                  })}
                />

                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.affiliation}>
                <FormLabel htmlFor={`${participants}.affiliation`} m={0}>
                  Box
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.affiliation`}
                  placeholder='Box do participante'
                  {...register(`${participants}.affiliation`, {
                    required: validationMessages['required'],
                  })}
                />

                <FormErrorMessage></FormErrorMessage>
              </FormControl>
            </HStack>
          </VStack>
        );
      })}
      <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
        <Button colorScheme='teal' w='100%' mt={4} type='submit' disabled={!isValid}>
          Próximo
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormSubscriptionParticipants;
