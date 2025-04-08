import React, { useState } from "react";
import '../styles/CreateRoom.css'
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/navigater/room", { state: { roomId, password } });
  };

  return (
    <div className="create-room">
        <h1>Create a Room</h1>
        <div className="create-room-form">
            <input placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleCreate}>Create</button>
        </div>
    </div>
  );
};

export default CreateRoom;
