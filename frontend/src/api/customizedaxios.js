import axios from 'axios';
import { toast } from 'react-toastify';

const axs = axios.create({
  baseURL: 'http://localhost:3004/',
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
