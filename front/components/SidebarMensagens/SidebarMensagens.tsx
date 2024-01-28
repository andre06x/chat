export const SidebarMensagens = ({ rooms, selectedRoom, setSelectedRoom }: any) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {rooms.map((room: any) => (
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
  );
};
