import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ViewerDashboard(){
    const{user} = useAuth();

    return(
        <div  style={{ padding: 20 }}>
            <h1>Viewer Dashboard</h1>
            <p>welcome, <strong>{user?.name || "viewer"}</strong>(role:{user?.role})</p>
        
            <div style={{ marginTop: 20 }}>
                <ul>
                    <li><Link to="/items">view items</Link>(view only)</li>
                    
                </ul>
            </div>
        
        </div>
    )
}


export default ViewerDashboard;
