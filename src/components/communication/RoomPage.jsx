import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import '../styles/RoomPage.css';

const socket = io("https://server-dlvn.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});

const RoomPage = () => {
  const { state } = useLocation();
  const { roomId, password } = state || {};
  const [songList, setSongList] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);

  // Join the room and handle sync events
  useEffect(() => {
    if (roomId && password) {
      socket.emit("join-room", { roomId, password });
    }

    socket.on("receive-song", ({ songUrl }) => {
      console.log("🔊 Received song to play:", songUrl);
      if (audioRef.current) {
        audioRef.current.src = songUrl;
        audioRef.current.onloadedmetadata = () => {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.error("Playback error (receive-song):", err);
            });
          }
        };
      }
    });

    socket.on("play-song", () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play();
      }
    });

    socket.on("pause-song", () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    });

    return () => {
      socket.off("receive-song");
      socket.off("play-song");
      socket.off("pause-song");
    };
  }, [roomId, password]);

  // Fetch songs from API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("https://server-dlvn.onrender.com/song/list");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setSongList(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  // 🔘 When user clicks a song
  const handleSongClick = async (song) => {
    try {
      console.log("🎵 Clicked song:", song.title);
      const songUrl = `https://server-dlvn.onrender.com/song/load/${song.title}`;
      setCurrentAudio(songUrl);

      // Send to others
      socket.emit("broadcast-song", {
        roomId,
        songUrl,
      });

      // Play locally after loading
      if (audioRef.current) {
        audioRef.current.src = songUrl;
        audioRef.current.onloadedmetadata = () => {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.error("Playback error (handleSongClick):", err);
            });
          }
        };
      }
    } catch (err) {
      console.error("handleSongClick error:", err);
    }
  };

  const handlePlay = () => {
    audioRef.current.play();
    socket.emit("play-song", { roomId });
  };

  const handlePause = () => {
    audioRef.current.pause();
    socket.emit("pause-song", { roomId });
  };

  return (
    <div className="room-page">
      <div className="room-container">
        <div className="broad-left">
          <h2>Room: {roomId}</h2>
          <audio ref={audioRef} controls style={{ marginTop: "20px" }} />
          <div style={{ marginTop: '10px' }}>
            <button onClick={handlePlay}>Play</button>
            <button onClick={handlePause}>Pause</button>
          </div>
        </div>

        <div className="broad-right">
          <ul className="broad-song-list">
            {songList.map((song) => (
              <li key={song.id || song.title} onClick={() => handleSongClick(song)}>
                <div>
                  <img
                    src={`https://server-dlvn.onrender.com/song/albumart/${song.albumArt}`}
                    alt="Album Art"
                    className="song-img"
                  />
                </div>
                <div className="song-details">
                  <div className="song-ti"><p>{song.title}</p></div>
                  <div className="song-art"><p>{song.artist}</p></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
