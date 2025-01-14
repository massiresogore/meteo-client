import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../auth/AuthContext';
const Navbar = () => {
  const auth = useAuth();
  const navigation = useNavigate();
  const handleLogou = () => {
    auth.logout();
    navigation('/');

  }
  return (
    <>
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Meteo-Reims</Link>
      </div>
      <div className="navbar-links">

      {auth.token?.token && <>
        <a href="/mes-adresses" className="navbar-link">Adesses Sauvegarder</a>
        <a href="/users" className="navbar-link">Users</a>
        <button className="navbar-link-logout" onClick={()=> handleLogou()}>logout</button>
      </>}
      {!auth.token?.token && <>
        <a href="/register" className="navbar-link">S'inscrire</a>
        <a href="/login" className="navbar-link">Login</a>
      </> }
   
       
      </div>
    </nav>
</>
  )
}

export default Navbar