import { Loader } from '@/components/Loader';
import { NoHasElement } from '@/components/NoHasElement';
import { ParticipantProvider } from '@/contexts/participant';
import useParticipantData from '@/hooks/useParticipantData';
import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { ChangeEvent, lazy, Suspense, useMemo, useState } from 'react';
import { Filter, Search } from 'react-feather';
import { useParams } from 'react-router-dom';

const ListParticipants = lazy(() => import('./components/list'));

const ParticipantWithProvider = () => {
  return (
    <ParticipantProvider>
      <Participants />
    </ParticipantProvider>
  );
};

const Participants = () => {
  const { id } = useParams();
  const { participantsPages } = useParticipantData();
  const [participantName, setParticipantName] = useState<string>('');

  const hasElements: boolean = useMemo(() => participantsPages.count !== 0, [participantsPages]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.length;
    return name >= 3 ? setParticipantName(event.target.value) : setParticipantName('');
  };

  console.log(id, 'id');

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
        <HStack w='100%' justifyContent='space-between'>
          {hasElements && (
            <>
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
            </>
          )}
        </HStack>

        {hasElements && (
          <Box w='100%' marginTop={6}>
            <ListParticipants participantName={participantName} />
          </Box>
        )}

        {!hasElements && (
          <NoHasElement
            linkTo={`/championships/${id}/subscriptions`}
            text='Você não possui participantes.'
            textLinkTo='Crie inscrições para ter participantes.'
          />
        )}
      </Box>
    </Suspense>
  );
};

export default ParticipantWithProvider;
