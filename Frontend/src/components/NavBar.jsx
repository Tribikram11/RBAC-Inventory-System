import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login")
    }

    if (!user) return null;

    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            borderBottom: "1px solid #ddd",
            marginBottom: "20px",
        }}>
            <div>
                <strong>Inventory System</strong>
            </div>
            <div style={{ display: "flex", gap: "15px" }}>
                <Link to="/">Dashboard</Link>
                <Link to="/items">Items</Link>

                {user.role === "admin" && (
                    <>
                        <Link to="/admin">Admin</Link>
                        <Link to="/admin/register-user">Register User</Link>
                    </>
                )}

                {user.role === "manager" && (
                    <>
                        <Link to="/manager">Manager</Link>
                    </>
                )}

                {user.role === "viewer" && (
                    <>
                        <Link to="/viewer">Viewer</Link>
                    </>
                )}
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span>
                    {user.name} ({user.role})
                </span>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default NavBar;