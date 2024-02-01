"use client";
import React, { use, useEffect, useState } from "react";
import { api } from "../api";
import { SidebarMensagens } from "@/components/SidebarMensagens/SidebarMensagens";
import { SidebarGrupos } from "@/components/SidebarGrupos/SidebarGrupos";
import { Mensagens } from "@/components/Mensagens/Mensagenx";
import { RequestRoom } from "@/components/RequestsRooms/RequestsRooms";

const ChatComponent = () => {
  const [sideBar, setSideBar] = useState("mensagens");
  const [roomSearch, setRoomSearch] = useState({ label: "", value: "" });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      const id = JSON.parse(localStorage.getItem("user") || "")._id;
      const response = await api.post("/room/last-messages", { id });
      console.log(response.data);
      setRooms(response.data);
    })();
  }, []);

  const criarSala = async () => {
    try {
      const userAdmId = JSON.parse(localStorage.getItem("user") || "")._id;
      const name = document.querySelector("#nome-sala")?.value;

      const response = await api.post("/room", { userAdmId, name });
      setRooms([...rooms, response.data]);
      console.log(name);
    } catch (err) {
      console.log(err);
    }
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
          borderRight: "1px solid #ccc",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        }}
        className="hidden sm:block"
      >
        <div className="flex justify-between hidden md:block ">
          <h2>Salas</h2>
          <button
            onClick={() =>
              setSideBar((sideBar) => (sideBar === "mensagens" ? "grupo" : "mensagens"))
            }
            className="bg-slate-400"
          >
            Salas
          </button>
        </div>

        <div className="hidden md:block">
          {sideBar === "mensagens" ? (
            <SidebarMensagens
              rooms={rooms}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
            />
          ) : selectedRoom === null ? (
            <SidebarGrupos
              criarSala={criarSala}
              setRoomSearch={setRoomSearch}
              roomSearch={roomSearch}
            />
          ) : (
            <RequestRoom selectedRoom={selectedRoom} />
          )}
        </div>
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
          <Mensagens selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
        ) : (
          <p>Selecione uma sala para ver as conversas.</p>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
