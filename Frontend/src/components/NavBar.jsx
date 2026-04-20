import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) return null;

    const navLinks = [
        { to: "/", label: "Dashboard", roles: ["admin", "manager", "viewer"] },
        { to: "/items", label: "Items", roles: ["admin", "manager", "viewer"] },
        { to: "/admin", label: "Admin", roles: ["admin"] },
        { to: "/admin/register-user", label: "Register User", roles: ["admin"] },
        { to: "/manager", label: "Manager", roles: ["manager"] },
        { to: "/viewer", label: "Viewer", roles: ["viewer"] },
    ];

    const roleBadgeColor = {
        admin: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
        manager: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
        viewer: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    };

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 px-6 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm select-none">
                        I
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Inventory RBAC
                    </span>
                </div>

                {/* Nav Links */}
                <div className="flex items-center gap-1">
                    {navLinks
                        .filter((l) => l.roles.includes(user.role))
                        .map((link) => {
                            const isActive = location.pathname === link.to;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-400 hover:text-white hover:bg-slate-700/60"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                </div>

                {/* User + Logout */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold uppercase select-none">
                            {user.name?.charAt(0) || "U"}
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-xs font-semibold text-slate-200 leading-none">{user.name}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full mt-0.5 font-medium capitalize ${roleBadgeColor[user.role] || "bg-slate-700 text-slate-300"}`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1.5 text-sm font-medium text-slate-300 border border-slate-600 rounded-lg hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/40 transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;