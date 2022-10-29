import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Category from '@/pages/private/Category';
import Championship from '@/pages/private/Championship';
import Ticket from '@/pages/private/Ticket';
import Workout from '@/pages/private/Workout';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Championship />} />
        <Route path='/' element={<Navigate to='/championships' replace />} />

        <Route path='/championships' element={<Championship />} />

        <Route path='/championships/:id/categories' element={<Category />} />
        <Route path='/championships/:id/tickets' element={<Ticket />} />
        <Route path='/championships/:id/workouts' element={<Workout />} />

        <Route path='/login' element={<Navigate to='/championships' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
