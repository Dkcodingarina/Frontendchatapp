import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io("http://localhost:5001");

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
            uppercase
            onChange={(e) => setUsername(e.target.value)}
            style={{ textTransform: 'uppercase' }}
          />
          <input
            type="text"
            placeholder="Enter room id"
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
