export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(token);
  };