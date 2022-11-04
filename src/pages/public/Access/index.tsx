import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import wodfulBlackLogo from '@/assets/icons/wodful-black-logo.svg';

const Access = () => {
  return (
    <Box>
      <Center px={5} h='90vh'>
        <Center maxW='512px' maxH='md' boxShadow='md' p='6' rounded='md'>
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
              <FormControl>
                <Stack gap='2'>
                  <Input type='email' placeholder='Código do campeonato' />
                </Stack>
              </FormControl>
              <Button colorScheme='teal' size='lg'>
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
