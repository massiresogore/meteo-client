
import axios from 'axios';

const baseUerl = 'http://localhost:8000/api';

//const  auth = useAuth ();
export const customFetch = axios.create({
  baseURL: baseUerl,
  headers: {
    'Content-Type': 'application/ld+json',
    'Accept': 'application/ld+json'
  }
});