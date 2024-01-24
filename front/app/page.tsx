"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://192.168.1.101:3000");

    newSocket.on("connect", () => {
      console.log("Funcionando");
      console.log("Socket.IO Connection Opened");

      const roomSelect = document.getElementById("roomSelect");
      const roomName = prompt("Enter room name:");
      const usuario = prompt("Enter user:");

      document.getElementById("usuario").innerHTML = usuario;
      roomSelect.add(new Option(roomName, roomName));

      newSocket.emit("joinRoom", roomName);
    });

    newSocket.on("roomMessages", (messages) => {
      displayRoomMessages(messages);
    });

    newSocket.on("newMessage", (message) => {
      displayNewMessage(message);
    });
    // Atualiza o estado do socket
    setSocket(newSocket);
    // Lembre-se de desconectar o socket quando o componente for desmontado
    return () => {
      newSocket.disconnect();
    };
  }, []);

  function sendMessage() {
    const room = document.getElementById("roomSelect").value;
    const content = document.getElementById("messageInput").value;

    if (socket && room && content) {
      const message = {
        user: document.getElementById("usuario").innerHTML,
        content,
      };
      displayNewMessage(message);
      socket.emit("sendMessage", { room, message });
      document.getElementById("messageInput").value = "";
    }
  }

  function displayRoomMessages(messages) {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = messages.map(formatMessage).join("");
  }

  function displayNewMessage(message) {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += formatMessage(message);
  }

  function formatMessage(message) {
    return `<p><strong>${message.user}:</strong> ${message.content}</p>`;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="chat">
        <select id="roomSelect"></select>
        <div id="messages"></div>
        <input type="text" id="messageInput" placeholder="Type your message..." />
        <h4 id="usuario"></h4>
        <button onClick={sendMessage}>Send</button>
      </div>{" "}
    </main>
  );
}
