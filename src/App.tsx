import { AuthProvider } from '@/contexts/auth';
import { CouponProvider } from '@/contexts/coupon';
import Routes from '@/routes';
import { AppProvider } from './contexts/app';

function App() {
  return (
    <AuthProvider>
      <CouponProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </CouponProvider>
    </AuthProvider>
  );
}

export default App;
