import React from "react";

export const checkAuthStatus = async () => {
    try {
        const response = await fetch("https://server-dlvn.onrender.com/api/auth/status", {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            console.error("Auth status check failed:", response.statusText);
            return { error: response.statusText };
        }
        return await response.json();
        
    } catch (error) {
        console.error("Auth request failed:", error);
        return { error: "Network error" };
    }
};