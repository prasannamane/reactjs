import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Attempting to fetch data...');
      try {
        let response = await axios.get('http://127.0.0.1:8000/api/users-list/');
        
        // Ensure the response is in the expected format
        if (Array.isArray(response.data.userlist)) {
          setData(response.data.userlist);
        } else {
          setData([response.data]);
        }
        
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
     
      <ul>
        {data.map((user, index) => (
          <li key={index}>
            <p>ID: {user.id || 'Not provided'}</p>
            <p>Mobile: {user.mobile || 'Not provided'}</p>
            <p>Password: {user.password || 'Not provided'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
