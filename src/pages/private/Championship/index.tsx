import useAuth from '@/hooks/useAuth';
import { Box, Button, Flex, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { exeChampionships } from './exempleChampionships';

const Championship = () => {
  const { Logout } = useAuth();
  const allChampionships = exeChampionships;

  async function handleLogout() {
    Logout();
  }
  // py={6} px={10}
  return (
    <>
      <Box px={10} bg='red'>
        <Box py={6}>
          <Flex align='center' justifyContent='space-between'>
            <Heading as='h4' size='md'>
              Lista de campeonatos
            </Heading>
            <Button colorScheme='teal'>Criar campeonato</Button>
          </Flex>
        </Box>

        <Box>
          <Box>
            <Stack w='485px' h='100px' overflow='hidden'>
              <Image borderTopRadius='lg' src={allChampionships[0].banner} />
            </Stack>
            <Stack borderWidth='1px'>
              <HStack>
                <Heading as='h4' size='md'>
                  {allChampionships[0].name}
                </Heading>
                <Text>
                  {allChampionships[0].startDate} até {allChampionships[0].startDate}
                </Text>
              </HStack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Championship;
