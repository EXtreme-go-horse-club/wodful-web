import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Category from '@/pages/private/Category';
import Home from '@/pages/private/Home';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category' element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
