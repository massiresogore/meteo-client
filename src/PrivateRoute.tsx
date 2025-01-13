import { useAuth } from './auth/useAuth'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const user = useAuth();

  if(!user) return <Navigate to="/login" />;
  return <Outlet/>
}

export default PrivateRoute