import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Login.css'
import Waves from "../reactbite/Waves";
import ClickSpark from "../reactbite/ClickSpark";
import TextField from '@mui/material/TextField';
import { Eye, EyeOff } from "lucide-react";


const Login = () => {
    const [email, setLogemail] = useState('');
    const [password, setLogpassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json();

            if(response.ok){
                navigate("/navigater", { replace: true });
                console.log(data);
            }
            else{
                alert("Login error "+ data.message);
            }
        }
        catch(error){
            console.log("There is an error in login "+ error);
        }
    }

    return (
        <div className="login-container">

            <ClickSpark
              sparkColor='#fff'
              sparkSize={15}
              sparkRadius={75}
              sparkCount={11}
              duration={600}
            >
              <Waves
              lineColor="#fff"
              backgroundColor="rgba(255, 255, 255, 0)"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={35}
              waveAmpY={20}
              friction={0.9}
              tension={0.01}
              maxCursorMove={120}
              xGap={12}
              yGap={36}
            />
            
            <div className="login-form">
            
            <ClickSpark
              sparkColor='#fff'
              sparkSize={15}
              sparkRadius={75}
              sparkCount={11}
              duration={600}
            >
                <h1>Login</h1>
                <form onSubmit={handleLogin} className="inner-form">
                    <div className="log_user_email">
                        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e)=>setLogemail(e.target.value)} required />
                    </div>
        
                    <div className="log_user_password">
                        <TextField type={showPassword ? "text" : "password"} id="outlined-basic-hidden" label="Password"  variant="outlined" value={password} onChange={(e)=>setLogpassword(e.target.value)} required />
                        <span className="toggle-password" onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
        
                    <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>

                    <div className="submit-log-btn">
                        <button type="submit">Login</button>
                    </div>
                </form>
                </ClickSpark>
            </div>
            
            </ClickSpark>
        </div>
    )
}

export default Login;
