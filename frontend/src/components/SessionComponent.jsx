import React, { useEffect, useState } from "react";

function SessionComponent() {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    fetch("/api/session")
      .then((response) => response.json())
      .then((data) => setSessionData(data))
      .catch((error) => console.error("Error fetching session data:", error));
  }, []);

  return (
    <div>
      {sessionData ? (
        <div>
          <h2>Session Data</h2>
          <pre>{JSON.stringify(sessionData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading session data...</p>
      )}
    </div>
  );
}

export default SessionComponent;
