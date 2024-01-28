import { api } from "@/app/api";
import { useEffect, useState } from "react";

export const RequestRoom = ({ selectedRoom }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    buscarRequest();
  }, []);

  const buscarRequest = async () => {
    const id = JSON.parse(localStorage.getItem("user") || "")._id;
    const response = await api.post("/room/list-request-room", {
      id,
      idRoom: selectedRoom._id,
    });
    console.log(response.data[0]?.requests);
    setRequests(response.data[0]?.requests?.filter((request) => !request.status) || []);
  };

  const aproveRequest = async (idAprove: string) => {
    const data = {
      id: JSON.parse(localStorage.getItem("user") || "")._id,
      idRoom: selectedRoom._id,
      idAprove,
    };

    const response = await api.post("/room/update-request", data);
    buscarRequest();
  };
  return (
    <div className="my-3">
      <div>
        <span>Requests Rooms</span>
        {requests.map((request) => (
          <div className="flex justify-between my-2">
            <span>{request?.name}</span>
            <button
              onClick={() => aproveRequest(request._idUser)}
              className="bg-slate-400"
            >
              Aceitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
