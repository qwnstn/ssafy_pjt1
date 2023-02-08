import React, { useState, useEffect } from "react";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection opened:", url);
    };

    socket.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          setMessages((prevMessages) => [...prevMessages, reader.result]);
        };
        reader.readAsText(event.data);
      } else {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed:", url);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return messages;
};

const WebSocketComponent = () => {
  const messages = useWebSocket("ws://localhost:8080");

  return (
    <div>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <p key={index}>Received message: {message}</p>
        ))
      ) : (
        <p>No messages received yet.</p>
      )}
    </div>
  );
};

export default WebSocketComponent;
