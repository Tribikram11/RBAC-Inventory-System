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
            await api.post("/auth/register", { name, email, password, role });
            setSuccess("User registered successfully!");
            setName("");
            setEmail("");
            setPassword("");
            setRole("viewer");
        } catch (error) {
            if (error.response?.data?.msg) {
                setError(error.response.data.msg);
            } else {
                setError("User registration failed");
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full bg-slate-900/60 border border-slate-600 text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";
    const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

    const roleColors = {
        admin: "text-purple-400",
        manager: "text-blue-400",
        viewer: "text-emerald-400",
    };

    return (
        <div className="max-w-lg">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Register New User</h1>
                <p className="text-slate-400 text-sm mt-1">Create a new user account and assign their role.</p>
            </div>

            {/* Card */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                {error && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg px-4 py-3 mb-5">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={labelClass}>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter full name"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className={`${inputClass} ${roleColors[role] || "text-slate-200"}`}
                        >
                            <option value="viewer" className="bg-slate-900 text-emerald-400">Viewer</option>
                            <option value="manager" className="bg-slate-900 text-blue-400">Manager</option>
                            <option value="admin" className="bg-slate-900 text-purple-400">Admin</option>
                        </select>

                        <p className="text-xs text-slate-500 mt-1.5">
                            {role === "admin" && "⚠️ Admin users have full access including managing users."}
                            {role === "manager" && "Managers can view and edit inventory stock levels."}
                            {role === "viewer" && "Viewers have read-only access to inventory."}
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate("/admin")}
                            className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Creating...
                                </span>
                            ) : "Register User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterUser;