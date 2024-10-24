export const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
  };