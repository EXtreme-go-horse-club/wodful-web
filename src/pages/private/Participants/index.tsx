import { Loader } from '@/components/Loader';
import { ParticipantProvider } from '@/contexts/participant';
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, lazy, Suspense, useState } from 'react';
import { Filter, Search, X } from 'react-feather';

const ListParticipants = lazy(() => import('./components/list'));

const Participants = () => {
  const [participantName, setParticipantName] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, 'event');
    return setInputValue(event.target.value);
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
                  value={inputValue as string}
                />
                {inputValue && (
                  <InputRightElement>
                    <X cursor='pointer' size={20} color='gray' onClick={() => setInputValue('')} />
                  </InputRightElement>
                )}
              </InputGroup>
              <Button
                minW='84px'
                leftIcon={<Filter size={14} />}
                variant='outline'
                colorScheme='gray'
                onClick={() => setParticipantName(inputValue)}
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
