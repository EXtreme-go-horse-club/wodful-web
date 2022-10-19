import { IChampionship } from '@/data/interfaces/championship';
import useChampionship from '@/hooks/championship';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { X } from 'react-feather';

interface CreateChampionshipProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateChampionship = ({ isOpen, onClose }: CreateChampionshipProps) => {
  const { CreateChampionship } = useChampionship();
  const [championship, setChampionship] = useState<IChampionship | null>(null);

  function handleSubmit(e) {
    setChampionship({
      name: e?.name,
      startDate: e?.startDate,
      endDate: e?.endDate,
      accessCode e?.acessCode,
      banner:  e?.banner,
      resultType: e?.resultType,
      address:  e?.address,
    })
    CreateChampionship({
      name: championship?.name,
      startDate: championshipe?.startDate,
      endDate: championship?.endDate,
      accessCode championship?.acessCode,
      banner:  championship?.banner,
      resultType: championship?.resultType,
      address:  championshipe?.address,
    });
  }

  return (
    <>
      <Modal size='lg' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack pt={4} pb={4} align='start' spacing='24px'>
              <HStack w='100%' align='start' justify='space-between'>
                <Heading as='h4' size='md'>
                  Criar campeonato
                </Heading>

                <X onClick={onClose} cursor='pointer' size={18} />
              </HStack>

              <FormControl display='flex' flexDirection='column' gap='24px' isRequired>
                <Stack>
                  <FormLabel m={0}>Nome</FormLabel>
                  <Input
                    onChange={handleSubmit}
                    value={championship?.name}
                    placeholder='Nome do campeonato'
                  />
                </Stack>

                <HStack>
                  <VStack align='start'>
                    <FormLabel m={0}>Data de início</FormLabel>
                    <Input type='datetime-local' placeholder='DD/MM/AAAA' />
                  </VStack>

                  <VStack>
                    <FormLabel m={0}>Data de encerramento</FormLabel>
                    <Input type='datetime-local' placeholder='DD/MM/AAAA' />
                  </VStack>
                </HStack>

                <Stack>
                  <FormLabel m={0}>Local</FormLabel>
                  <Input placeholder='Endereço' />
                </Stack>

                <Stack>
                  <FormLabel m={0}>Código do campeonato</FormLabel>
                  <Input placeholder='Endereço' />
                </Stack>

                <Stack>
                  <FormLabel m={0}>Tipo de resultado</FormLabel>
                  <Select placeholder='Selecione o tipo'>
                    <option value='option1'>Pontuação</option>
                    <option value='option2'>Colocação</option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel m={0}>Capa do campeonato</FormLabel>
                  <Input p={1} type='file' />
                </Stack>
                <VStack>
                  <Button w='100%' colorScheme='teal' onClick={handleSubmit}>
                    Adicionar
                  </Button>
                  <Button w='100%' variant='outline' onClick={onClose}>
                    Fechar
                  </Button>
                </VStack>
              </FormControl>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateChampionship;
