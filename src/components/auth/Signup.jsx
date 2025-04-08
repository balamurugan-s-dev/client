import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Signup.css'

import Waves from "../reactbite/Waves";
import ClickSpark from "../reactbite/ClickSpark";
import TextField from '@mui/material/TextField';
import { Eye, EyeOff } from "lucide-react";

const Signup = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async(e) =>{
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: 'POST',
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await response.json();

            if(response.ok){
                navigate("/navigater", { replace: true });
                console.log(data);
            }
            else{
                alert("Signup error "+ data.message);
            }
        }
        catch(error){
            console.log("There is an error in signup "+ error);
        }
    }

    return (
        <div className="signup-container">
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
                <div className="signup-form">
                    <ClickSpark
                    sparkColor='#fff'
                    sparkSize={15}
                    sparkRadius={75}
                    sparkCount={11}
                    duration={600}
                    >
                    <h1>Signup Page</h1>
                    <form onSubmit={handleSignup} className="inner-signform">
                        <div className="user_name">
                            <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} required />
                        </div>

                        <div className="user_email">
                            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                        </div>

                        <div className="password">
                            <TextField type={showPassword ? "text" : "password"} id="outlined-basic-hidden" label="Password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                                <span className="toggle-password" onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                        </div>

                        <p>Already have an account? <Link to="/">Login</Link></p>

                        <div className="submit_btn">
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                    </ClickSpark>
                </div>
            </ClickSpark>
        </div>
    )
}

export default Signup;