import useAuth from '@/hooks/useAuth';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const Routes = () => {
  const { signed } = useAuth();
  return signed ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
