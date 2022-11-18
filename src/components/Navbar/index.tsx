import { Box, Link, Tab, TabList, Tabs, Tooltip } from '@chakra-ui/react';
import { ChevronLeft } from 'react-feather';
import { Link as RouterLink, Outlet, useParams } from 'react-router-dom';

export const Navbar = () => {
  const params = useParams();

  const NavItems = [
    {
      label: 'Leaderboard',
      path: `/championships/${params.id}/leaderboards`,
    },
    {
      label: 'Categorias',
      path: `/championships/${params.id}/categories`,
    },
    {
      label: 'Tickets',
      path: `/championships/${params.id}/tickets`,
    },
    {
      label: 'Provas',
      path: `/championships/${params.id}/workouts`,
    },
    {
      label: 'Resultados',
      path: `/championships/${params.id}/results`,
    },
    {
      label: 'Inscrições',
      path: `/championships/${params.id}/subscriptions`,
    },
    {
      label: 'Participantes',
      path: `/championships/${params.id}/participants`,
    },
    {
      label: 'Cronograma',
      path: `/championships/${params.id}/schedules`,
    },
  ];

  return (
    <>
      <Tabs>
        <TabList
          position='relative'
          justifyContent='center'
          bg='gray.50'
          h='50px'
          alignItems='center'
        >
          <Tooltip label='Voltar' placement='top' hasArrow>
            <Box position='absolute' left='50px' _hover={{ cursor: 'pointer' }}>
              <Link as={RouterLink} to={`/championships`} _hover={{ color: 'blue.500 ' }} h='100%'>
                <ChevronLeft color={'black'} size={24} />
              </Link>
            </Box>
          </Tooltip>
          {NavItems.map((item) => (
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
