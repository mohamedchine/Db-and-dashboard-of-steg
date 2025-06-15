import { useState, useEffect } from 'react';
import axs from '../../../api/customizedaxios';

const useFetchPerformanceData = (dateRange, triggerFetch) => {
  const [performanceData, setPerformanceData] = useState(null);
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

        const response = await axs.post('/groupement/centralsdata/byperiode', requestBody);

        if (response.data.success) {
          setPerformanceData(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch performance data');
        }

      } catch (err) {
        console.error('Error fetching performance data:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (triggerFetch) {
      fetchData();
    }

  }, [dateRange, triggerFetch]);

  return { performanceData, loading, error };
};

export default useFetchPerformanceData;

