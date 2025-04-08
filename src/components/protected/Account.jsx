import React, {useState, useEffect } from 'react';
import { checkAuthStatus } from '../authenticator/Auth';
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Account.css'

const Account = ({ admin }) =>{


    const defaultProfilePic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [profile, setProfile] = useState(defaultProfilePic);
    const [uploadPic, setuploadPic] = useState(null);
    const naviagte=useNavigate();

    useEffect(() => {
          const checkAuth = async () => {
              const authData = await checkAuthStatus();
              if (!authData || authData.error) {
                  navigate("/");
              }
              else{
                  setUserName(authData.name);
                  setEmail(authData.email);
              }
          };
    
          checkAuth();
    }, [navigate]);


    const fetchProfile = async () => {
        const response = await fetch("http://localhost:5000/api/auth/userprofile", {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            return;
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        setProfile(imageUrl);
    };

    useEffect(() => {
        fetchProfile();
    }, []);


    const handlelogout = async () => {
        const response = await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        const data = await response.json();
        if (data.message === "Logout successful") {
            navigate("/");
        }
    }

    const handleProfileChange = async () => {
        if (!uploadPic) {
            console.error("No file selected");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", uploadPic);
    
        try {
            const response = await fetch("http://localhost:5000/api/auth/update/profile", {
                method: "PUT",
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                console.error("Profile update failed");
                return;
            }

            console.log("Profile updated successfully");

            setuploadPic(null);
            fetchProfile();
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleOpenAdmin = () => {
        window.open('/admin', '_blank');
      };

    return (
        <div className='account-container'>
            <h1>User Detail</h1>

            {admin && (
                    <div className="admin-link">
                        <button onClick={handleOpenAdmin}>
                            Admin
                        </button>
                    </div>
            )}

            <div className="account_page">
                <div className="profile">
                    <img src={profile} alt="profile" onError={(e) => e.target.src = defaultProfilePic} />
                    <label className='profile_label' htmlFor="profile_image"></label>
                    <input type="file" id="profile_image" accept='image/*' hidden onChange={(e)=>setuploadPic(e.target.files[0])} />
                </div>

                <div className="change_profile">
                    {uploadPic && <button onClick={handleProfileChange}>Update Pic</button>}
                </div>

                <div className="account_user">
                    <span className='user-name-email'><span className='top-name'>Name: </span>{userName}</span>
                    <span className='user-name-email'><span className='top-name'>Email: </span>{email}</span>
                </div>

                <div className="logout-btn">
                    <button onClick={handlelogout}>Logout</button>
                </div>
            </div>

            
        </div>
    )
}

export default Account;

