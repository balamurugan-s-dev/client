import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { checkAuthStatus } from "../authenticator/Auth";
import '../styles/Admin.css';


const Administrator = ({ admin}) => {
    const navigate = useNavigate();
    const [songList, setSongList] = useState([])
    const [uploadSong, setUploadSong] = useState(null);


    if (!admin) return <Navigate to="/" />;
    useEffect(() => {
        const checkAuth = async () => {
            const authData = await checkAuthStatus();
            if (!authData || authData.error) {
                navigate("/");
            }
        };

        checkAuth();
    }, [navigate, checkAuthStatus]);


    const handleUploadSong = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("audio", uploadSong);

        try {
            const response = await fetch("http://localhost:5000/song/upload", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (response.ok) {
                console.log("Song uploaded successfully!");
                setUploadSong(null);
            } else {
                console.error("Failed to upload song.");
            }
        } catch (error) {
            console.error("Error uploading song:", error);
        }
    };

    const handleTotalSongList = async() => {
        try {
            const res = await fetch("http://localhost:5000/song/list");
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            setSongList(data);
          } catch (error) {
            console.error("Error fetching songs:", error);
          }
    };

    useEffect(() => {
        handleTotalSongList();
    },[]);

    const handleDelete = async(id) =>{
        try{
            const req = await fetch(`http://localhost:5000/song/delete/${id}`,{
                method: 'DELETE',
                credentials: 'include'
            })
            const data = await req.json();

            if(!req.ok){
                console.log("Song did not deleted !"+ data.message);
                return;
            }

            console.log(data.message);
            setSongList((prevSongs) => prevSongs.filter(song => song.id !== id));
            handleTotalSongList();
            
        }
        catch(error){
            console.log("Error in deleting song "+ error);
        }
    }

    return (
        <div className="admin-container">
            <h1>Administrator</h1>
            <form onSubmit={handleUploadSong}>
                <div className="song-name">
                    <label htmlFor="upload_song">Upload the song </label>
                    <input type="file" id="upload_song" accept="audio/*" required onChange={(e) => setUploadSong(e.target.files[0])} />
                </div>

                <div className="submit-upload-btn">
                    <button type="submit">Upload</button>
                </div>
            </form>

            <div className="total_song_list">
                <h2>Total song list</h2>
                <table className="song_list_table">
                    <thead>
                        <tr>
                            <th>Album Art</th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="total_song">
                        {songList.map((song) => (
                            <tr key={song._id}>
                                <td>
                                    <img 
                                        src={`http://localhost:5000/song/albumart/${song.albumArt}`} 
                                        alt={song.title} 
                                        className="album_art"
                                    />
                                </td>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>
                                    <button className="delete_button" onClick={() => handleDelete(song._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Administrator;