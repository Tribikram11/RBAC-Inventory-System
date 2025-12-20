import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterUser() {

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("viewer");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!name || !email || !password || !role) {
            setError("All fields are required");
            return;
        }

        setLoading(true);

        try {
            await api.post("/auth/register", {
                name, email, password, role
            })
            setSuccess("User registered successfully")

            setName("");
            setEmail("");
            setPassword("");
            setRole("viewer");

        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                setError(error.response.data.msg)
            } else {
                setError("User registration failed")
            }
        } finally {
            setLoading(false)
        }


    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Register New User</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                <div style={{ marginBottom: 10 }}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: "100%" }}
                    >
                        <option value="viewer">Viewer</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Creating..." : "Register User"}
                </button>
            </form>
        </div>
    );

}


export default RegisterUser;