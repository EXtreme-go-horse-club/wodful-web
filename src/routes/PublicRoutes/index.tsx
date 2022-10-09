import Login from '@/pages/public/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
