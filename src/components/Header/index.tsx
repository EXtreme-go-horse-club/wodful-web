import useApp from '@/hooks/useApp';
import useAuth from '@/hooks/useAuth';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  WrapItem,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/icons/wodful-white-logo.svg';

const NO_TITLE_ROUTES = ['/championships', '/login'];

const NO_EXIT_ROUTES = ['/access', '/login'];

export const Header = () => {
  const { signed, Logout, Reset } = useAuth();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const { currentChampionship } = useApp();

  const untitledRoutes = useMemo(() => NO_TITLE_ROUTES.includes(pathname), [pathname]);
  const noExitRoutes = useMemo(() => NO_EXIT_ROUTES.includes(pathname), [pathname]);

  return (
    <Flex
      px='40px'
      py='15px'
      width='full'
      bg='gray.800'
      alignItems='center'
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
        <Heading color='whiteAlpha.900' fontSize={20} fontWeight='500' textTransform='capitalize'>
          {!untitledRoutes ? currentChampionship?.name : null}
        </Heading>
      </Flex>

      <Flex>
        {signed ? (
          <HStack gap='8px'>
            <WrapItem>
              <Avatar name={user?.name} />
            </WrapItem>
            <Menu isLazy>
              <MenuButton color='whiteAlpha.900' fontSize={16} fontWeight='700'>
                Configurações
              </MenuButton>
              <MenuList>
                <MenuItem onClick={Logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          !noExitRoutes && (
            <Button color='white' variant='link' onClick={Reset}>
              Sair
            </Button>
          )
        )}
      </Flex>
    </Flex>
  );
};
