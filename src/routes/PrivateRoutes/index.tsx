import Championship from '@/pages/private/Championship';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/championships' element={<Championship />} />
        <Route path='/' element={<Navigate to='/championships' replace />} />

        <Route path='/login' element={<Navigate to='/championships' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
