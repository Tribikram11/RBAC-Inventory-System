import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ManagerDashboard(){
    const{user} = useAuth();

    return(
        <div style={{ padding: 20 }}>
            <h1>Manager Dashboard</h1>
            <p>welcome, <strong>{user?.name || "manager"}</strong>(role:{user?.role})</p>
        
            <div style={{ marginTop: 20 }}>
                <ul>
                    <li><Link to="/items">view items</Link></li>
                    <li><Link to="/items/manage">Edit Stock</Link>(Managers can edit stock)</li>
                </ul>
            </div>
        
        </div>
    )
}


export default ManagerDashboard;
