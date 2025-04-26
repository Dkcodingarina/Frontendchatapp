import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

// Connect directly to your backend hosted on Render
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ["websocket"],
});

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChat = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
      {!showChat && (
        <div className="join_room">
          <h1>Join Room</h1>
          <input
            type="text"
            placeholder="Enter your Name"
            onChange={(e) => setUsername(e.target.value.toUpperCase())}
            style={{ textTransform: 'uppercase' }}
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinChat}>Join</button>
        </div>
      )}
      {showChat && <Chat socket={socket} username={username} room={room} />}
    </>
  );
};

export default App;
