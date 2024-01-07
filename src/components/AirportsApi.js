// AirportsApi.js
import React, { useState, useEffect } from "react";

const AirportsApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://airports.p.rapidapi.com/";
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "773145228emsh47ab63620899a1fp133514jsn88aacb23e9fd",
          "X-RapidAPI-Host": "airports.p.rapidapi.com",
        },
        body: JSON.stringify({ search: "Pun" }),
      };

      try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>API Data:</h2>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default AirportsApi;
