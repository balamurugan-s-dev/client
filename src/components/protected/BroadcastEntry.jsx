import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/BroadcastEntry.css'


const BroadcastEntry = () => {
  const navigate = useNavigate();

  return (
    <div className="broadcast-entry">
        <h2>Start a Broadcast</h2>
        <div className="broadcast-btn">
            <button onClick={() => navigate("/navigater/create-room")}>Create Room</button>
            <button onClick={() => navigate("/navigater/join-room")}>Join Room</button>
        </div>
    </div>
  );
};

export default BroadcastEntry;
