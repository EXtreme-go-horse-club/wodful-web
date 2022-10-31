import { Link, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
  const params = useParams();
  const NavItems = [
    {
      label: 'Dashboard',
      path: '/championships/',
    },
    {
      label: 'Categorias',
      path: `/championships/${params.id}/categories`,
    },
    {
      label: 'Provas',
      path: `/championships/${params.id}/workouts`,
    },
    {
      label: 'Tickets',
      path: `/championships/${params.id}/tickets`,
    },
    {
      label: 'Cronograma',
      path: `/championships/${params.id}/workouts`,
    },
  ];

  return (
    <>
      <Tabs>
        <TabList justifyContent='center' bg='gray.50' h='50px'>
          {NavItems.map((item) => (
            <Tab key={item.label}>
              <Link as={RouterLink} to={item.path} _hover={{ color: 'blue.500 ' }}>
                {item.label}
              </Link>
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <Outlet />
    </>
  );
};
