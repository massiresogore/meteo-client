import React, { useState } from 'react'
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '../../service/api-client';

const AdresseForm = () => {
     const [adresse, setAdresse] = useState("");
     const auth = useAuth();
     const navigate = useNavigate();
     
   
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        try {
          await customFetch.post(`/adresses`, {name: adresse, user: `api/users/${auth.token?.user.id}`}, {
            headers: { Authorization: `Bearer ${auth.token?.token}` }
          });
          alert('Adresse ajouter  successfully');
        } catch (error) {
          console.error('Error updating user:', error);
          alert('Failed to update adresse');
        }
      };
      
    


  return (
    <form className="save-address-form" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Enregistrer une adresse ..."
      value={adresse}
      onChange={(e) => setAdresse(e.target.value)}
      className="save-address-input"
    />
    <button type="submit" className="save-address-button">
      Enregistrer
    </button>
  </form>
  )
}

export default AdresseForm


