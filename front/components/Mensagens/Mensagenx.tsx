export const Mensagens = ({ selectedRoom, setSelectedRoom }) => {
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
          <input className="flex-1 h-7 mr-4 rounded" type="text" />
          <button className="button bg-slate-400 text-white rounded p-1">Send</button>
        </div>
      </div>
    </div>
  );
};
