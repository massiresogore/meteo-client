import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '../../service/api-client';
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
   const response =  await axios.post('http://localhost:8000/auth', { email, password });
   console.log(response.data);
   
    login(response.data);
    navigate('/');
  };

  return (
    <div className="login-container">
    <h2>Connexion</h2>
    <div className="login-form">
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Adresse email"
        className="login-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Se connecter
      </button>
    </div>
  </div>
  );
};

export default LoginForm;
