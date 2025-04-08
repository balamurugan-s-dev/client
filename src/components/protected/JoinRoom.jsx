import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/JoinRoom.css';

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/navigater/room", { state: { roomId, password } });
  };

  return (
    <div className="join-room">
        <h1>Join a Room</h1>
        <div className="join-room-form">
            <input placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleJoin}>Join</button>
        </div>
    </div>
  );
};

export default JoinRoom;
