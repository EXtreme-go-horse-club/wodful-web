import useAuth from '../../hooks/useAuth';

const Login = () => {
  function handleLogin() {
    Login({ username: 'mcastegnaro', password: 'senha@123' });
  }

  const { Login } = useAuth();

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
