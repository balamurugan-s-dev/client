import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../protected/Home";
import Explore from "../protected/Explore";
import Playlist from "../protected/Playlist";
import Account from "../protected/Account";

import CreateRoom from "../protected/CreateRoom";
import JoinRoom from "../protected/JoinRoom";
import BroadcastEntry from "../protected/BroadcastEntry";
import RoomPage from "../communication/RoomPage";

import Navigater from "./Navigater";

const AnotherNavigater = ({ admin }) => {
    return (
        <div>
            <Navigater />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/account" element={<Account admin={admin} />} />

                <Route path="/broadcast" element={<BroadcastEntry />} />
                <Route path="/create-room" element={<CreateRoom />} />
                <Route path="/join-room" element={<JoinRoom />} />

                <Route path="/room" element={<RoomPage />} />
            </Routes>
        </div>
    );
};

export default AnotherNavigater;
