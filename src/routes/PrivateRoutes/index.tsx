import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Category from '@/pages/private/Category';
import Championship from '@/pages/private/Championship';
import Ticket from '@/pages/private/Ticket';
import Workout from '@/pages/private/Workout';
import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';
import { ChampionshipProvider } from '@/contexts/championship';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <ChampionshipProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Championship />} />
          <Route path='/' element={<Navigate to='/championships' replace />} />

          <Route path='/championships' element={<Championship />} />
          <Route path='/login' element={<Navigate to='/championships' replace />} />

          <Route path='/championships/:id/' element={<Navbar />}>
            <Route path='/championships/:id/categories' element={<Category />} />
            <Route path='/championships/:id/tickets' element={<Ticket />} />
            <Route path='/championships/:id/workouts' element={<Workout />} />
          </Route>
        </Routes>
      </ChampionshipProvider>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
