import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../../pages/public/Login';

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
