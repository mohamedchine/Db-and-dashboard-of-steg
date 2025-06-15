import { useState, useEffect, useContext } from 'react';
import { ScentralsContext } from '../../../context/supervisedcentrals';
import axs from '../../../api/customizedaxios';

const useFetchCentrals = () => {
  const { setCentrals } = useContext(ScentralsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCentrals = async () => {
      try {
        setLoading(true);
        const response = await axs.get('/groupement/supervisedcentrals');
        
        if (response.data.success) {
          setCentrals(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching centrals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCentrals();
  }, []);

  return { loading };
};

export default useFetchCentrals;

