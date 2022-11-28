import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';
import Access from '@/pages/public/Access';
import PublicLeaderboard from '@/pages/public/Leaderboard';
import Login from '@/pages/public/Login';
import PublicSchedule from '@/pages/public/Schedule';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/championships' element={<Navigate to='/login' replace />} />
        <Route path='/championships/:id/*' element={<Navigate to='/login' replace />} />
        <Route path='/access' element={<Access />} />
        <Route path='/access/:code/' element={<Navbar />}>
          <Route path='/access/:code/leaderboards' element={<PublicLeaderboard />} />
          <Route path='/access/:code/schedules' element={<PublicSchedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
