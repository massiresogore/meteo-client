

import React, { useState } from "react";
import './register.css';
import { useAuth } from "../../auth/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  //console.log(auth);

  const handleRegister = () => {
    
    
   axios.post("http://localhost:8000/api/users", { email, password },{
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    }
   });
    navigate("/login");
  };

  return (
    <div className="registration-container">
      <h2>Créer un compte</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="registration-form"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adresse email"
          className="registration-input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="registration-input"
          required
        />
        <button type="submit" className="registration-button">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
