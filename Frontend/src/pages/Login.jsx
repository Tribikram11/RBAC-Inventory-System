import { useState, useNavigate } from "react"
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handeleEvent = async (e) => {
        e.preventDefault();
        setError(null);

        // validate
        if (!email || !password) {
            setError("email and passwords are required");
            return;
        }

        setLoading(true);

        // call backend api
        try {
            const res = await api.post("/auth/login", {
                email, password
            });
            // extract token and user
            const token = res.data.token;
            const user = res.data.user;

            // 4. Save user & token in global AuthContext
            login({ token, user });

            // separate them based on role
            if (user.role == "admin") {
                navigate("/admin")
            } else {
                navigate("/")
            }

        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError("Something went wrong. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container" style={{ padding: "20px" }}>
            <h2>Login</h2>

            <form onSubmit={handeleEvent} style={{ maxWidth: "300px" }}>
                {error && (
                    <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
                )}
                <div style={{ marginBottom: "10px" }}>
                    <label >email</label>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label >password</label>
                    <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="password"
                            style={{ width: "100%" }}
                     />
                </div>

                <button type="submit"
                        disabled={loading}
                        style={{
                        width: "100%",
                        padding: "10px",
                        cursor: loading ? "not-allowed" : "pointer",
                        }}
                >
                    {loading ? "logging in ...": "Login"}
                </button>
            </form>
        </div>
    )

}


export default Login;