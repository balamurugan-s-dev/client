import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { checkAuthStatus } from '../authenticator/Auth';
import { useScrollContext } from "../authenticator/ScrollContext";
import '../styles/Home.css';
import Expand from '../assets/expand-solid.svg';


const Home = () =>{

    const [songList, setSongList] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [isfullscreen, setIsFullscreen] = useState(false);
    const { containerRef } = useScrollContext();

    useEffect(() => {
      const checkAuth = async () => {
          const authData = await checkAuthStatus();
          if (!authData || authData.error) {
              navigate("/");
          }
      };

      checkAuth();
    }, [navigate]);

    useEffect(() => {
        const fetchSongs = async () => {
          try {
            const res = await fetch("http://localhost:5000/song/list");
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            setSongList(data);
          } catch (error) {
            console.error("Error fetching songs:", error);
          }
        };
        fetchSongs();
    }, []);


    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.src = `http://localhost:5000/song/load/${currentSong.title}`;
            audioRef.current.load();
            audioRef.current.play();
        }
      }, [currentSong]);

    const playSong = (song) => {
        setCurrentSong(song);
      };


    return (
        <div className='home-container' ref={containerRef}>


            <div className="hero_gerner">
                <ul>
                    <li>Popular</li>
                    <li>Rock</li>
                    <li>Pop</li>
                    <li>Electronic</li>
                    <li>Classical</li>
                </ul>
            </div>


            <h1>Listen again</h1>
            <div className="song-list1" >
                <ul>
                  {songList.map((song) => (
                    <li key={song.id || song.title} className="song-li" onClick={() => playSong(song)}>
                      <div>
                        <img
                          src={`http://localhost:5000/song/albumart/${song.albumArt}`}
                          alt="Album Art"
                          className="song-image"
                        />
                        <span className="play-button">▶</span>
                      </div>
                      <div className="song-details">
                        <div className="song-ti"><p>{song.title}</p></div>
                        <div className="song-art"><p>{song.artist}</p></div>
                      </div>
                    </li>
                  ))}
                </ul>
            </div>

            {currentSong && (
                <div className={"song_player" + (isfullscreen ? ' song_player1' : '')}>
                    <div className={(isfullscreen ? ' player_left' : '')}>
                      <img src={`http://localhost:5000/song/albumart/${currentSong.albumArt}`} alt="" />
                      <div className="mini_play">
                        <span>{currentSong.title} - {currentSong.artist}</span>
                        <audio ref={audioRef} controls />
                      </div>
                      <div className="fullscreen">
                          <button onClick={() => setIsFullscreen(!isfullscreen)}> <img src={Expand} alt="icon" /> </button>
                      </div>
                    </div>

                    <div className={"overlay" + (isfullscreen ? 'player_right' : '')}>
                      <div className="lyrics">
                        {currentSong?.lyrics?.[0]?.split("\n").map((line, index) => (
                          <p key={index}>{line}</p>
                        )) || "No lyrics available"}
                      </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;