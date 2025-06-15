import { useState, useEffect } from 'react';
import axs from '../../../api/customizedaxios';

const useFetchIncidentsData = (dateRange, triggerFetch) => {
  const [incidentsData, setIncidentsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!dateRange || !dateRange.from || !dateRange.to) {
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const requestBody = {
          start: dateRange.from,
          end: dateRange.to
        };

        const response = await axs.post('/groupement/defeq-alarms-maintenance/byperiode', requestBody);

        if (response.data.success) {
          setIncidentsData(response.data.data);
          console.log(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch incidents data');
        }

      } catch (err) {
        console.error('Error fetching incidents data:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (triggerFetch) {
      fetchData();
    }

  }, [dateRange, triggerFetch]);

  return { incidentsData, loading, error };
};

export default useFetchIncidentsData;

