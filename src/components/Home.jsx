import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [apiEndpoints, setApiEndpoints] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApiEndpoints = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('Authentication token not found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/v1/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApiEndpoints(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch API endpoints');
        setLoading(false);
      }
    };

    fetchApiEndpoints();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available API Endpoints</h2>
      <ul className="list-disc pl-5">
        {Object.keys(apiEndpoints).map((key) => (
          <li key={key}>
            <strong>{key}:</strong> <a href={apiEndpoints[key]} target="_blank" rel="noopener noreferrer">{apiEndpoints[key]}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
