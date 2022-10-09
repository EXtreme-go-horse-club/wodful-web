import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../../pages/Login';

const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SignRoutes;
