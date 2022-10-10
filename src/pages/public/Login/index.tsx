import useAuth from '@/hooks/useAuth';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import wodfulBlackLogo from '@/assets/icons/wodful-black-logo.svg';
import wodfulWhiteLogo from '@/assets/icons/wodful-white-logo.svg';
import { useState } from 'react';

const Login = () => {
  // isLoading usar no botão
  const { Login, isError, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmpty = !email.length || !password.length;

  function handleLogin() {
    Login({ email: email, password: password });
  }

  return (
    <Box>
      <Flex h='72px' bg='gray.800' color='white'>
        <Center pl='10'>
          <Image boxSize='40px' src={wodfulWhiteLogo} alt='wodfull white logo' />
          <Heading as='h5' size='sm'>
            Wodful
          </Heading>
        </Center>
      </Flex>

      <Center h='90vh'>
        <Center maxW='xl' maxH='md' boxShadow='md' p='6' rounded='md'>
          <Stack gap='4' align='center' justify='center'>
            <Image boxSize='48px' src={wodfulBlackLogo} alt='wodfull black logo' />

            <Stack align='center'>
              <Heading as='h4' size='md'>
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
                  />
                  <Input
                    onChange={(event) => {
                      setPassword(event?.target.value);
                    }}
                    type='password'
                    placeholder='Senha'
                  />
                </Stack>
                {isError && <FormErrorMessage>E-mail ou senha incorreto.</FormErrorMessage>}
              </FormControl>
              <Button
                isLoading={isLoading}
                disabled={isEmpty || isLoading}
                colorScheme='teal'
                size='lg'
                onClick={handleLogin}
              >
                Continuar
              </Button>
              <Button variant='link'>Acessar campeonato com código</Button>
            </Stack>
          </Stack>
        </Center>
      </Center>
    </Box>
  );
};

export default Login;
