import LoginForm from './LoginForm';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  return (
   <LoginForm />
  );
};

export default LoginPage;