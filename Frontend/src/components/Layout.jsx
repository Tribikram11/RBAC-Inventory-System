import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function LayOut(){
    return(
        <>
            <NavBar/>
            <main style={{padding: "0 20px"}}>
                <Outlet/>
            </main>
        </>
    )
}

export default LayOut;