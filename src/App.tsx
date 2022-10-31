import { AuthProvider } from '@/contexts/auth';
import Routes from '@/routes';
import { AppProvider } from './contexts/app';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
