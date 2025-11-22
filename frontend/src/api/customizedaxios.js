import axios from 'axios';
import { toast } from 'react-toastify';
const baseURL = process.env.REACT_APP_API_BASE_URL;
console.log(baseURL);
const axs = axios.create({
  
  baseURL: process.env.REACT_APP_API_BASE_URL ,
  withCredentials: true,
});

axs.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response && error.response.status === 401) {
      const message =
        error.response.data?.message || 'Unauthorized. Please login again.';

      // Show toast immediately
      toast.error(message);

      // Wait 3 seconds → then redirect
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    }

    throw error;
  }
);

export default axs;
