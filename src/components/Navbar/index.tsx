import useAuth from '@/hooks/useAuth';
import { Box, Link, Tab, TabList, Tabs, Tooltip } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft } from 'react-feather';
import { Outlet, Link as RouterLink, useLocation, useParams } from 'react-router-dom';

export const Navbar = () => {
  const params = useParams();
  const { signed } = useAuth();
  const [tabIndex, setTabIndex] = useState<number>();

  const location = useLocation();

  const NavItems = useMemo(
    () => [
      {
        identifier: 'leaderboards',
        label: 'Leaderboard',
        path: `/championships/${params.id}/leaderboards`,
      },
      {
        identifier: 'categories',
        label: 'Categorias',
        path: `/championships/${params.id}/categories`,
      },
      {
        identifier: 'tickets',
        label: 'Tickets',
        path: `/championships/${params.id}/tickets`,
      },
      {
        identifier: 'workouts',
        label: 'Provas',
        path: `/championships/${params.id}/workouts`,
      },
      {
        identifier: 'results',
        label: 'Resultados',
        path: `/championships/${params.id}/results`,
      },
      {
        identifier: 'subscriptions',
        label: 'Inscrições',
        path: `/championships/${params.id}/subscriptions`,
      },
      {
        identifier: 'participants',
        label: 'Participantes',
        path: `/championships/${params.id}/participants`,
      },
      {
        identifier: 'schedules',
        label: 'Cronograma',
        path: `/championships/${params.id}/schedules`,
      },
    ],
    [params.id],
  );

  const NavItemsPublic = useMemo(
    () => [
      {
        identifier: 'leaderboards',
        label: 'Leaderboard',
        path: `/access/${params.code}/leaderboards`,
      },
      {
        identifier: 'schedules',
        label: 'Cronograma',
        path: `/access/${params.code}/schedules`,
      },
      {
        identifier: 'workouts',
        label: 'Provas',
        path: `/access/${params.code}/workouts`,
      },
    ],
    [params.code],
  );

  const handleTabsChange = useCallback(() => {
    const cutUrl = location.pathname.split('/')[3];
    if (signed) {
      for (let i = 0; i < NavItems.length; i++) {
        NavItems[i].identifier === cutUrl ? setTabIndex(i) : false;
      }
      return;
    }
    for (let i = 0; i < NavItemsPublic.length; i++) {
      NavItemsPublic[i].identifier === cutUrl ? setTabIndex(i) : false;
    }
  }, [location.pathname, signed, NavItems, NavItemsPublic]);

  useEffect(() => {
    handleTabsChange();
  }, [handleTabsChange, location.pathname]);

  return (
    <>
      <Tabs
        as={'section'}
        position={!signed ? 'fixed' : undefined}
        top={!signed ? '72px' : undefined}
        width={'100%'}
        zIndex={'1'}
        index={tabIndex}
      >
        <TabList
          position='relative'
          justifyContent='center'
          bg='gray.50'
          h='50px'
          alignItems='center'
        >
          <Tooltip label='Voltar' placement='top' hasArrow>
            <Box position='absolute' left='50px' _hover={{ cursor: 'pointer' }}>
              {signed && (
                <Link
                  as={RouterLink}
                  to={`/championships`}
                  _hover={{ color: 'blue.500 ' }}
                  h='100%'
                >
                  <ChevronLeft color={'black'} size={24} />
                </Link>
              )}
            </Box>
          </Tooltip>
          {signed
            ? NavItems.map((item) => (
                <Link
                  key={item.label}
                  as={RouterLink}
                  to={item.path}
                  _hover={{ color: 'blue.500 ' }}
                  h='100%'
                >
                  <Tab h='-webkit-fill-available'>{item.label}</Tab>
                </Link>
              ))
            : NavItemsPublic.map((item) => (
                <Link
                  key={item.label}
                  as={RouterLink}
                  to={item.path}
                  _hover={{ color: 'blue.500 ' }}
                  h='100%'
                >
                  <Tab h='-webkit-fill-available'>{item.label}</Tab>
                </Link>
              ))}
        </TabList>
      </Tabs>
      <Outlet />
    </>
  );
};
