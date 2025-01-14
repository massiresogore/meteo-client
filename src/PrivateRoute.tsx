import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const PrivateRoute = () => {
   const { token } = useAuth();
   

  if(!token?.token) return <Navigate to="/login" />;
  return <Outlet/>
}

export default PrivateRoute