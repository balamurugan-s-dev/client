import React, { useState, useEffect } from "react";
import { useScrollContext } from "../authenticator/ScrollContext";
import { Link } from "react-router-dom";
import "../styles/Navigater.css";
import Assets from "../assets/Assets";

const Navigater = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { isScrolled } = useScrollContext();
    const [imageMap, setImageMap] = useState({});
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!query) return setResults([]);
      const res = await fetch(`https://server-dlvn.onrender.com/song/search?query=${query}`,{
        method: 'GET',
        credentials: 'include'
      });
      if (!res.ok) {
        throw new Error("Failed to fetch songs");
      }

      const data = await res.json();
      setResults(data);


      const imageUrls = {};
    await Promise.all(data.map(async (song) => {
      const res = await fetch(`https://server-dlvn.onrender.com/song/albumArt/${song.albumArt}`, {
        method: 'GET',
        credentials: 'include'
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      imageUrls[song._id] = url;
    }));
    setImageMap(imageUrls);
  };

    const debounce = setTimeout(fetchSongs, 300);
    return () => clearTimeout(debounce);
  }, [query]);

    return (
        <div className="navigater_container">
            <div className={`top_nav ${isScrolled ? "top_nav_border" : ""}`}>
                <div className="active_button">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}><img src={isMenuOpen ? Assets.MenuOpen : Assets.MenuClose} alt="menu_btn" /></button>
                </div>
                <div className="logo">
                    <h1>Spotify</h1>
                </div>

                <div className="search_bar">
                    <img htmlFor="search" src={Assets.Search} alt="" />
                    <input type="text" id="search" placeholder="Search song, playlist or artist" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <img src={Assets.Close} alt="" onClick={() => setQuery('')}/>

                    <ul className="search_result">
                        {results.map((song) => (
                            <li key={song._id} className="sr_item">
                                <img src={imageMap[song._id]} alt={song.title} />
                                <div>
                                    <p>{song.title}</p>
                                    <p>{song.artist}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="room_account">
                    <div className="party_room">
                        <button><Link to='/navigater/broadcast'><img src={Assets.Meeting} alt="" /></Link></button>
                    </div>

                    <div className="account-link">
                        <Link to="/navigater/account">A</Link>
                    </div>
                </div>
            </div>
            <div className={`left_nav ${isMenuOpen ? "navActive" : ""} ${isScrolled ? "left_nav_border" : ""}`}>
                <div className="home-link">
                    
                    <Link to="/navigater"><div className={`nav_wrapper ${isMenuOpen ? "navWarppActive" : ""}`}><img src={Assets.HomeIcon} alt="" /><span>Home</span></div></Link>
                </div>
                <div className="explore-link">
                    
                    <Link to="/navigater/explore"><div className={`nav_wrapper ${isMenuOpen ? "navWarppActive" : ""}`}><img src={Assets.Explore} alt="" /><span>Explore</span></div></Link>
                </div>
                <div className="playlist-link">
                    <div>
                    <Link to="/navigater/playlist"><div className={`nav_wrapper ${isMenuOpen ? "navWarppActive" : ""}`}><img src={Assets.Playlist} alt="" /><span>Playlist</span></div></Link>
                    {isMenuOpen && (
                      <img className="droparrow" src={isDropdownOpen ? Assets.ArrowUp : Assets.ArrowDown} onClick={() => setIsDropdownOpen(!isDropdownOpen)} alt="dropdown_arrow"/>
                      )}
                    </div>
                    {isMenuOpen && isDropdownOpen && (
                      <div className="dropdown">
                        <ul>
                            <li><button>Create Playlist</button></li>
                            <li>Playlist 1</li>
                            <li>Playlist 2</li>
                            <li>Playlist 3</li>
                            <li>Playlist 4</li>
                            <li>Playlist 5</li>
                            <li>Playlist 6</li>
                            <li>Playlist 7</li>
                            <li>Playlist 8</li>
                        </ul>
                      </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navigater;
