import useAuth from '../hooks/useAuth';
import OtherRoutes from './OtherRoutes';
import SignRoutes from './SignRoutes';

const Routes = () => {
  const { signed } = useAuth();
  return signed ? <OtherRoutes /> : <SignRoutes />;
};

export default Routes;
