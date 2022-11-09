import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';
import Category from '@/pages/private/Category';
import Championship from '@/pages/private/Championship';
import PrivateLeaderboard from '@/pages/private/Leaderboard';
import Participants from '@/pages/private/Participants';
import Subscription from '@/pages/private/Subscription';
import Ticket from '@/pages/private/Ticket';
import Workout from '@/pages/private/Workout';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Championship />} />
        <Route path='/' element={<Navigate to='/championships' replace />} />

        <Route path='/championships' element={<Championship />} />
        <Route path='/login' element={<Navigate to='/championships' replace />} />

        <Route path='/championships/:id/' element={<Navbar />}>
          <Route path='/championships/:id/dashboard' element={<PrivateLeaderboard />} />
          <Route path='/championships/:id/leaderboard' element={<PrivateLeaderboard />} />
          <Route path='/championships/:id/participants' element={<Participants />} />
          <Route path='/championships/:id/categories' element={<Category />} />
          <Route path='/championships/:id/tickets' element={<Ticket />} />
          <Route path='/championships/:id/workouts' element={<Workout />} />
          <Route path='/championships/:id/subscriptions' element={<Subscription />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
