import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
    const storedData = window.sessionStorage.getItem("userSession");

    if (storedData !== null) {
      try {
        const parsedData = JSON.parse(storedData);
        setSessionData(parsedData);
      } catch (error) {
        console.error("Error parsing session data:", error);
      }
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-center title">Dashboard</h1>
      {sessionData ? (
        <div>
          <p>Welcome: {sessionData.first_name}</p>
          
        </div>
      ) : (
        <p>No session data available</p>
      )}
    </div>
  );
};

export default Dashboard;
