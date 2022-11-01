import useApp from '@/hooks/useApp';
import useAuth from '@/hooks/useAuth';
import { Box, Flex, Heading, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/icons/wodful-white-logo.svg';

export const Header = () => {
  const { signed, Logout } = useAuth();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const { currentChampionship } = useApp();

  const isChampionshipRoute = useMemo(() => pathname === '/championships', [pathname]);
  const profile = user?.name.substring(0, 1);

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
        <Heading color='whiteAlpha.900'>
          {!isChampionshipRoute ? currentChampionship?.name : null}
        </Heading>
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
        ) : null}
      </Flex>
    </Flex>
  );
};
