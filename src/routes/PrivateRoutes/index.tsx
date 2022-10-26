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
        <Route path='/categories' element={<Category />} />
        <Route path='/tickets' element={<Ticket />} />
        <Route path='/workouts' element={<Workout />} />
        <Route path='/championships' element={<Championship />} />
        <Route path='/' element={<Navigate to='/championships' replace />} />

        <Route path='/login' element={<Navigate to='/championships' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
