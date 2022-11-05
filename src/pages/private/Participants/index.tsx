import { Loader } from '@/components/Loader';
import { ParticipantProvider } from '@/contexts/participant';
import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { ChangeEvent, lazy, Suspense, useState } from 'react';
import { Filter, Search } from 'react-feather';

const ListParticipants = lazy(() => import('./components/list'));

const Participants = () => {
  const [participantName, setParticipantName] = useState<string>('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.length;
    return name >= 3 ? setParticipantName(event.target.value) : setParticipantName('');
  };

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <ParticipantProvider>
        <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
          <HStack w='100%' justifyContent='space-between'>
            <Text fontSize='2xl' as='b'>
              Lista de Participantes
            </Text>
            <HStack>
              <InputGroup>
                <InputLeftElement>
                  <Search size={20} color='gray' />
                </InputLeftElement>
                <Input
                  onChange={handleOnChange}
                  as='input'
                  w='100%'
                  minW='320px'
                  placeholder='Buscar participante'
                />
              </InputGroup>
              <Button
                minW='84px'
                leftIcon={<Filter size={14} />}
                variant='outline'
                colorScheme='gray'
              >
                Filtrar
              </Button>
            </HStack>
          </HStack>

          <Box w='100%' marginTop={6}>
            <ListParticipants participantName={participantName} />
          </Box>
        </Box>
      </ParticipantProvider>
    </Suspense>
  );
};

export default Participants;
