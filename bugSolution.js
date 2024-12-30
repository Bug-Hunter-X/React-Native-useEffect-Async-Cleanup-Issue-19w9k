```javascript
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const controller = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data', { signal: controller.signal });
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cancel the fetch request if the component unmounts
    };
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display data */}
    </div>
  );
};

export default MyComponent;
```