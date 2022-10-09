import useAuth from '@/hooks/useAuth';
import PublicRoutes from './PrivateRoutes';
import PrivateRoutes from './PublicRoutes';

const Routes = () => {
  const { signed } = useAuth();
  return signed ? <PublicRoutes /> : <PrivateRoutes />;
};

export default Routes;
