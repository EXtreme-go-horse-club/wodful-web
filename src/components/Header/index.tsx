import { Box, Flex, Heading, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Logo from '../../assets/icons/wodful-white-logo.svg';
import useAuth from '@/hooks/useAuth';
import { default as useChampionshipData } from '@/hooks/useChampionshipData';

export const Header = () => {
  const { signed, Logout } = useAuth();
  const { user } = useAuth();
  const profile = user?.name.substring(0, 1);

  const { currentChampionship } = useChampionshipData();
  console.log(currentChampionship);
  return (
    <Flex
      px='40px'
      py='15px'
      width='full'
      bg='gray.800'
      alignItems='flex-end'
      justifyContent='space-between'
    >
      <Flex alignItems='flex-end'>
        <Box>
          <Image src={Logo} alt='logo' boxSize='40px' marginRight='8px' />
        </Box>
        <Heading color='whiteAlpha.900' fontSize={16} marginBottom={2}>
          Wodful
        </Heading>
      </Flex>
      <Flex>
        <Heading color='whiteAlpha.900'>{currentChampionship?.name}x</Heading>
      </Flex>

      <Flex>
        {signed ? (
          <Flex>
            <Flex
              borderRadius='full'
              bg='teal.500'
              width='32px'
              height='32px'
              alignItems='center'
              justifyContent='center'
              marginRight='10px'
            >
              <Heading color='whiteAlpha.900' fontSize={16} fontWeight='500'>
                {profile}
              </Heading>
            </Flex>
            <Menu isLazy>
              <MenuButton color='whiteAlpha.900' fontSize={16} fontWeight='700'>
                Configurações
              </MenuButton>
              <MenuList>
                <MenuItem onClick={Logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Flex />
        )}
      </Flex>
    </Flex>
  );
};
