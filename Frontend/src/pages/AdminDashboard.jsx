import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function AdminDashboard(){
    const {user} = useAuth();

    return(
        <div style={{ padding: 20 }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, <strong>{user?.name || "admin"}</strong>(role: {user?.role})</p>

            <div style={{ marginTop: 20 }}>
                <ul>
                    <li><Link to="/items">view items</Link></li>
                    <li><Link to="/items/add">add items</Link></li>
                    <li><Link to="/items/manage">manage items</Link></li>
                    <li><Link to="/items/register-user">register new user</Link></li>
                </ul>
            </div>

        </div>
    )

}

export default AdminDashboard;