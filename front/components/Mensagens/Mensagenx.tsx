import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const Mensagens = ({ selectedRoom, setSelectedRoom }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (selectedRoom) {
      const newSocket = io("http://192.168.1.108:3000");

      newSocket.on("connect", () => {
        const roomId = selectedRoom._id;
        newSocket.emit("joinRoom", roomId);
      });

      newSocket.on("roomMessages", (messages) => {
        console.log(messages);
      });

      newSocket.on("newMessage", (message) => {
        console.log(message);
        setSelectedRoom(message);
      });
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [selectedRoom]);

  function sendMessage() {
    if (socket && selectedRoom._id) {
      const id = JSON.parse(localStorage.getItem("user") || "")._id;
      const name = JSON.parse(localStorage.getItem("user") || "").name;

      const message = {
        id,
        content: document.getElementById("messageInput").value,
        idRoom: selectedRoom._id,
        name,
      };
      const content = document.getElementById("messageInput").value;
      const idRoom = selectedRoom._id;
      //displayNewMessage(message);
      socket.emit("sendMessage", { id, content, idRoom });

      let selected = { ...selectedRoom };
      selected.messages.push(message);
      setSelectedRoom(selected);
      document.getElementById("messageInput").value = "";
    }
  }

  return (
    <div
      className="position-relative flex flex-col justify-between"
      style={{ height: "95% " }}
    >
      <div className="">
        <div className="flex justify-between">
          <h3>{`Sala: ${selectedRoom.name}`}</h3>
          <button
            className="bg-slate-400 p-1 rounded"
            onClick={() => setSelectedRoom(null)}
          >
            Fechar
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {selectedRoom.messages.map((message, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{message.name}:</strong> {message.content}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded border h-12 rounded-md bg-[#F0F2F5]">
        <div className="p-3 flex rounded">
          <input className="flex-1 h-7 mr-4 rounded" type="text" id="messageInput" />
          <button
            className="button bg-slate-400 text-white rounded p-1"
            onClick={() => {
              sendMessage();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
