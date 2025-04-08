import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ProtectedRoute from './components/authenticator/ProtectRoute';
import AnotherNavigater from './components/navigater/anotherNavigater';
import { checkAuthStatus } from './components/authenticator/Auth';
import { ScrollProvider } from './components/authenticator/ScrollContext';
import Administrator from "./components/foradmin/Administrator";

import ClickSpark from './components/reactbite/ClickSpark';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            const data = await checkAuthStatus();
            setIsAuthenticated(data.userId ? true : false);
            setIsLoading(false);
        };
        verifyAuth();
    }, []);

    return (
        <Router>
            <ClickSpark
              sparkColor='#fff'
              sparkSize={15}
              sparkRadius={75}
              sparkCount={11}
              duration={600}
            >
                {isLoading && (
                    <div className="load">
                        <h2 style={{ color: "#fff" }}>Loading...</h2>
                    </div>
                )}            
                <ScrollProvider>
                    <div className='app_bg'>
                        <Routes>
                            <Route path="/" element={isAuthenticated ? <Navigate to="/navigater" replace /> : <Login />} />
                            <Route path="/signup" element={isAuthenticated ? <Navigate to="/navigater" replace /> : <Signup />} />
                            <Route path="/navigater/*" element={<ProtectedRoute element={<AnotherNavigater />} />} />
                            <Route path="/admin" element={<ProtectedRoute element={<Administrator />} />} />
                        </Routes>
                    </div>
                </ScrollProvider>
            </ClickSpark>
        </Router>
    );
};

export default App;
