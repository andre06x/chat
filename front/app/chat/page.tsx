"use client";
import React, { useState } from "react";

const ChatComponent = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = ["Sala 1", "Sala 2", "Sala 3"];

  const messages = [
    { user: "Usuário 1", text: "Oi, tudo bem?" },
    { user: "Usuário 2", text: "Sim, e você?" },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          flex: "30%",
          borderRight: "1px solid #ccc",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        }}
      >
        <h2>Salas</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {rooms.map((room, index) => (
            <li
              key={index}
              onClick={() => setSelectedRoom(room)}
              style={{
                cursor: "pointer",
                padding: "8px",
                margin: "5px 0",
                backgroundColor: selectedRoom === room ? "#ddd" : "inherit",
              }}
            >
              {room}
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          flex: "70%",
          padding: "10px",
          backgroundColor: "white",
          color: "#333",
          borderBottom: "1px solid black",
        }}
      >
        <h2>Conversas</h2>
        {selectedRoom ? (
          <div
            className="position-relative flex flex-col justify-between"
            style={{ height: "100% " }}
          >
            <div className="">
              <h3>{`Sala: ${selectedRoom}`}</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {messages.map((message, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <strong>{message.user}:</strong> {message.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 border h-12 rounded-md bg-[#F0F2F5]">
              <div className="p-3 flex">
                <input className="flex-1 h-7 mr-4" type="text" />
                <button className="button bg-[#54656F] rounded p-1">Send</button>
              </div>
            </div>
          </div>
        ) : (
          <p>Selecione uma sala para ver as conversas.</p>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
