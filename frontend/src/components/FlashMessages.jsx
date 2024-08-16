import React, { useEffect, useState } from "react";
import "./FlashMessages.css";

const FlashMessages = () => {
  const [messages, setMessages] = useState({
    successMessages: [],
    errorMessages: [],
  });

  useEffect(() => {
    fetch("/api/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  return (
    <div>
      {messages.successMessages.map((msg, index) => (
        <div key={index} className="flash-message success">
          {msg}
        </div>
      ))}
      {messages.errorMessages.map((msg, index) => (
        <div key={index} className="flash-message error">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default FlashMessages;
