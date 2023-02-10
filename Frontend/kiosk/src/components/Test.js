import React, { useState, useEffect } from "react";

const socket = new WebSocket("ws://localhost:3333");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    socket.onmessage = (event) => {
      setServerMessage(event.data);
    };

    socket.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
    };

    socket.onclose = (event) => {
      console.log(`WebSocket connection closed with code ${event.code}`);
    };
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.send(message);
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit">Send</button>
      </form>
      <p>{serverMessage}</p>
    </div>
  );
};

export default Chat;