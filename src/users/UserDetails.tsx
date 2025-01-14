import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUser } from './userProvider';
import { customFetch } from '../service/api-client';
import { useAuth } from '../auth/AuthContext';

import "./userDetails.css";

  const UserDetails = () => {
    const params = useParams();
    const id:number = Number(params.id);
    const[user , setUser] = useState<any>({});
    const[email , setEmail] = useState<string>("");
    const auth = useAuth();
     const navigate = useNavigate();
   
  
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('user:', email);
        
        try {
          await customFetch.patch(`/users/${id}`, {email}, {
            headers: { Authorization: `Bearer ${auth.token?.token}`,"Content-Type":"application/merge-patch+json" }
          });
          alert('User updated successfully');
          navigate('/users');
        } catch (error) {
          console.error('Error updating user:', error);
          alert('Failed to update user');
        }
      };
      
      const handleDelete = async () => {
        try {
          await customFetch.delete(`/users/${id}`, {
            headers: { Authorization: `Bearer ${auth.token?.token}` }
          });
          alert('User deleted successfully');
          navigate('/users');
        } catch (error) {
          console.error('Error deleting user:', error);
          alert('Failed to delete user');
        }
      };

      useEffect(() => {
        if (user.email) {
          setEmail(user.email);
        }
      }, [user]);
    useEffect(() => {
      const getUser = async (id:number) => {
           return  await customFetch.get(`/users/${id}`, {
             headers: { Authorization: `Bearer ${auth.token?.token}`}
             }).then(response => setUser(response.data))
            }
             getUser(id);
             
    }, [params.id]);

    return (
     <>
       <div className="container">
      <h2 className="headin">User {params.id}</h2>
      <form onSubmit={handleSubmit} className="form" id="userupdateForm">
        <div className="formGroup">
          <label className="label">Email:</label>
          <input
            className="input"
            name="email"
            onChange={handleChange}
            value={email}
            type="email"
          />
        </div>
        <button type="submit" className="button updateButton" >
          Update
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="button deleteButton"
      >
        Delete
      </button>
    </div>
     </>
    );
  };

  export default UserDetails;