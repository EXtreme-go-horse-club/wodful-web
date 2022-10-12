import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Championship from '@/pages/private/Championship';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/championships' element={<Championship />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
