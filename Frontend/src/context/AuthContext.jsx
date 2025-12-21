import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    // load the initial values from localstorage so refresh keeps user logged in
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch  {
            return null;
        }
    })
    const [token, setToken] = useState(() => {
        try {
            return localStorage.getItem('token') || null;
        } catch  {
            return null;
        }
    })


    const isAuthenticated = Boolean(token && user);
// Syncing state → localStorage
    useEffect(() => {
        try {
            if (token) localStorage.setItem("token", token);
            else localStorage.removeItem("token")
        } catch { return null;}
    }, [token])

    useEffect(() => {
        try {
            if (user) localStorage.setItem("user", JSON.stringify(user));
            else localStorage.removeItem("user")
        } catch {return null; }
    }, [user])

    // login logic
    const login = ({ token: newToken, user: newUser }) => {
        setToken(newToken);
        setUser(newUser);
    }

    // logout
    const logout = () => {
        setToken(null);
        setUser(null);
        // clear the local storage
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('user');
        } catch { return null;}

    }
    // You can expose helper getters if useful
    const authValue = {
        token,
        user,
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
}
// custom hook
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) {
        throw new Error("useAuth must be used inside an AuthProvider")
    }
    return ctx;
}

export default AuthContext;