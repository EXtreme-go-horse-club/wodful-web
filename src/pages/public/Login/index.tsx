import useAuth from '@/hooks/useAuth';
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
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const { Login, isError, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmpty = !email.length || !password.length;

  function handleLogin() {
    Login({ email: email, password: password });
  }

  return (
    <Box>
      <Center h='90vh'>
        <Center maxW='xl' maxH='md' boxShadow='md' p='6' rounded='md'>
          <Stack gap='4' align='center' justify='center'>
            <Image
              boxSize='48px'
              src={wodfulBlackLogo}
              alt='wodfull black logo'
              data-cy='logo-wodful'
            />

            <Stack align='center'>
              <Heading as='h4' size='md' data-cy='login-title'>
                Acesso do Wodful
              </Heading>
              <Text color='gray.500'>Sistema de gerenciamento de campeonatos de crossfit</Text>
            </Stack>

            <Stack gap='2' w='100%'>
              <FormControl isInvalid={isError}>
                <Stack gap='2'>
                  <Input
                    type='email'
                    onChange={(event) => {
                      setEmail(event?.target.value);
                    }}
                    placeholder='E-mail'
                    data-cy='input-email'
                  />
                  <Input
                    onChange={(event) => {
                      setPassword(event?.target.value);
                    }}
                    type='password'
                    placeholder='Senha'
                    data-cy='input-senha'
                  />
                </Stack>
                {isError && (
                  <FormErrorMessage data-cy='error-message'>
                    E-mail ou senha incorreto.
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button
                isLoading={isLoading}
                disabled={isEmpty || isLoading}
                colorScheme='teal'
                size='lg'
                onClick={handleLogin}
                data-cy='button-continuar'
              >
                Continuar
              </Button>
              <Stack as='article' justify='center' align='center'>
                <Link to='/access' data-cy='link-acesso'>
                  <Button variant='link'>Acessar campeonato com código</Button>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Center>
      </Center>
    </Box>
  );
};

export default Login;
