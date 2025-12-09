import useAuth from "../context/AuthContext";
import Navigate from "react-router-dom";

function Dashboard(){
    const {user} = useAuth();

    if(!user){
        return <Navigate to="/login" replace/>
    }

    if(user.role == "admin"){
        <Navigate to="admin" replace/>
    }

    if(user.role == "manager"){
        <Navigate to="manager" replace/>
    }
    if(user.role == "viewer"){
        <Navigate to="viewer" replace/>
    }

    return <Navigate to="/login" replace/>
}

export default Dashboard;
