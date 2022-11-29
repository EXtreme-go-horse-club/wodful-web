import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import wodfulBlackLogo from '@/assets/icons/wodful-black-logo.svg';
import useAuth from '@/hooks/useAuth';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Access = () => {
  const { Access, isError, isLoading } = useAuth();
  const [accessCode, setAccessCode] = useState('');
  const navigate = useNavigate();

  const handlePublicAccess = useCallback(() => {
    Access(accessCode).then(() => {
      return navigate(`/access/${accessCode}/leaderboards`);
    });
  }, [Access, accessCode, navigate]);

  const isEmpty = useMemo(() => !accessCode.length, [accessCode]);

  return (
    <Box>
      <Center px={5} h='90vh'>
        <Center maxW='512px' maxH='md' boxShadow={['none', 'md']} p='6' rounded='md'>
          <Stack gap='4' align='center' justify='center'>
            <Image boxSize='48px' src={wodfulBlackLogo} alt='wodfull black logo' />

            <Stack align='center'>
              <Heading as='h4' size='md'>
                Acesso do Wodful
              </Heading>
              <Text color='gray.500' textAlign='center'>
                Informe o código de acesso do campeonato para poder conferir o cronograma e o placar
                atual
              </Text>
            </Stack>

            <Stack gap='2' w='100%'>
              <FormControl isInvalid={isError}>
                <Stack gap='2'>
                  <Input
                    type='text'
                    placeholder='Código do Campeonato'
                    onChange={(event) => {
                      setAccessCode(event?.target.value.toUpperCase());
                    }}
                  />
                </Stack>
                {isError && <FormErrorMessage>Código incorreto ou inválido</FormErrorMessage>}
              </FormControl>
              <Button
                colorScheme='teal'
                size='lg'
                onClick={handlePublicAccess}
                isLoading={isLoading}
                disabled={isEmpty || isLoading}
              >
                Continuar
              </Button>
            </Stack>
          </Stack>
        </Center>
      </Center>
    </Box>
  );
};

export default Access;
