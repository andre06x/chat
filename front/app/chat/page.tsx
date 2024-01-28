"use client";
import React, { use, useEffect, useState } from "react";
import { api } from "../api";
import Select from "react-select/async";

const ChatComponent = () => {
  const [sideBar, setSideBar] = useState("mensagens");
  const [roomSearch, setRoomSearch] = useState({ label: "", value: "" });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  // const rooms = ["Sala 1", "Sala 2", "Sala 3"];

  const messages = [
    { user: "Usuário 1", text: "Oi, tudo bem?" },
    { user: "Usuário 2", text: "Sim, e você?" },
  ];

  useEffect(() => {
    (async () => {
      const id = JSON.parse(localStorage.getItem("user"))._id;
      const response = await api.post("/room/last-messages", { id });
      console.log(response.data);
      setRooms(response.data);
    })();
  }, []);

  const criarSala = async () => {
    try {
      const userAdmId = JSON.parse(localStorage.getItem("user"))._id;
      const name = document.querySelector("#nome-sala").value;

      const response = await api.post("/room", { userAdmId, name });
      setRooms([...rooms, response.data]);
      console.log(name);
    } catch (err) {
      console.log(err);
    }
  };

  const requisitarSala = async () => {
    try {
      const id = JSON.parse(localStorage.getItem("user"))._id;
      const idRoom = roomSearch.value;

      const response = await api.post("/room/request-room", { id, idRoom });
      alert("Requisição enviada");
    } catch (err) {
      console.log(err);
    }
  };

  const loadOptions = async (inputValue) => {
    const response = await api.post("/room/search", { room: inputValue });

    const options = response.data.map((item) => ({ value: item._id, label: item.name }));
    return options;
  };

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
        <div className="flex justify-between">
          <h2>Salas</h2>
          <button
            onClick={() =>
              setSideBar((sideBar) => (sideBar === "mensagens" ? "grupo" : "mensagens"))
            }
            className="bg-slate-400"
          >
            Grupos
          </button>
        </div>
        {sideBar === "mensagens" ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {rooms.map((room, index) => (
              <li
                key={room._id}
                onClick={() => setSelectedRoom(room)}
                style={{
                  cursor: "pointer",
                  padding: "8px",
                  margin: "5px 0",
                  backgroundColor: selectedRoom === room ? "#ddd" : "inherit",
                }}
              >
                <span>{room.name}</span>
                <br />
                <span>
                  {" "}
                  {room.messages[room.messages.length - 1]?.name}:{" "}
                  {room.messages[room.messages.length - 1]?.content}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col">
            <div className="flex">
              <label htmlFor="">Criar</label>
              <input type="text" id="nome-sala" />
              <button onClick={() => criarSala()} className="bg-slate-400">
                Criar
              </button>
            </div>

            <div className="flex">
              <label htmlFor="">Requisitar</label>
              <Select
                loadOptions={loadOptions}
                onChange={(selectedOption) => setRoomSearch(selectedOption)}
                isClearable
              />{" "}
              <button onClick={() => requisitarSala()} className="bg-slate-400">
                Requisitar
              </button>
            </div>
          </div>
        )}
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
              <h3>{`Sala: ${selectedRoom.name}`}</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {selectedRoom.messages.map((message, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <strong>{message.name}:</strong> {message.content}
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
