import Login from '@/pages/public/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/championships' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
