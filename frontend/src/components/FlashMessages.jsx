import { useState, useEffect } from "react";

function FlashMessages() {
  const [messages, setMessages] = useState({ success: "", error: "" });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/get-messages");
        const data = await response.json();
        console.log("Fetched data:", data);
        setMessages({
          success: data.success_msg,
          error: data.error_msg,
        });
      } catch (error) {
        console.error("Error fetching flash messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      {messages.success && (
        <div className="flash-success">{messages.success}</div>
      )}
      {messages.error && <div className="flash-error">{messages.error}</div>}
    </div>
  );
}

export default FlashMessages;
