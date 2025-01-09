import React, { useState, useEffect } from 'react';
import axios from 'axios';


const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Attempting to fetch data...');
      try {
        const response = await axios.get('http://localhost:8006/api');
        console.log('Data fetched successfully:', response.data); 
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.log('Error fetching data:', err.message); 
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {/* Display your data here */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};
export default DataFetcher;