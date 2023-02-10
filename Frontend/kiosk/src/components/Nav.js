import { useState, useEffect } from "react";

// 비회원 결제 버튼을 누르면 rfid read 페이지로 넘어간뒤, itemlist 페이지로 넘어가는 기능
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
  
      socket.onerror = (error) => {
        console.error(`WebSocket error: ${error}`);
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

  export default function Div() {
    const messages = useWebSocket("ws://localhost:3333");

    return messages;
  }