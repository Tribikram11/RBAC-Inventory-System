import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function LayOut() {
    return (
        <div className="min-h-screen bg-slate-900">
            <NavBar />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
}

export default LayOut;