import React, { useState } from "react";
import './register.css';
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Logique pour l'enregistrement ici
    console.log("Enregistrement :", { email, password });
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

export default Register;
