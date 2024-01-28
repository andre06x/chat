import { api } from "@/app/api";
import Select from "react-select/async";

interface ResposeRooms {
  _id: string;
  name: string;
}
export const SidebarGrupos = ({ criarSala, setRoomSearch, roomSearch }: any) => {
  const requisitarSala = async () => {
    try {
      const id = JSON.parse(localStorage.getItem("user") || "")._id;
      const idRoom = roomSearch.value;

      await api.post("/room/request-room", { id, idRoom });
      alert("Requisição enviada");
    } catch (err) {
      console.log(err);
    }
  };

  const loadOptions = async (inputValue: string) => {
    const response = await api.post("/room/search", { room: inputValue });

    const options = response.data.map((item: ResposeRooms) => ({
      value: item._id,
      label: item.name,
    }));
    return options;
  };
  return (
    <div className="flex flex-col my">
      <div className="flex flex-col my-3">
        <label htmlFor="">Nome da sala</label>
        <input type="text" id="nome-sala" className="h-8" />
        <button onClick={() => criarSala()} className="bg-slate-400 h-8">
          Criar
        </button>
      </div>

      <div className="flex flex-col my-3 ">
        <label htmlFor="">Requisitar</label>
        <Select
          loadOptions={loadOptions}
          onChange={(selectedOption) => setRoomSearch(selectedOption)}
          isClearable
        />{" "}
        <button onClick={() => requisitarSala()} className="bg-slate-400 h-8">
          Requisitar
        </button>
      </div>
    </div>
  );
};
