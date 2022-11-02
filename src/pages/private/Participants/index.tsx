import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { Filter, Search } from 'react-feather';
import ListParticipants from './components/list';

const Participants = () => {
  const dale = 'dole';

  return (
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
            <Input w='100%' minW='320px' placeholder='Buscar participante' />
          </InputGroup>
          <Button minW='84px' leftIcon={<Filter size={14} />} variant='outline' colorScheme='gray'>
            Filtrar
          </Button>
        </HStack>
      </HStack>

      <Box w='100%' marginTop={6}>
        <ListParticipants />
      </Box>
    </Box>
  );
};

export default Participants;
