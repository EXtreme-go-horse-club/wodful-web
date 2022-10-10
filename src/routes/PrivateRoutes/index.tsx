import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages/private/Home';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/daledole' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
