import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function AdminDashboard() {
    const { user } = useAuth();

    const quickLinks = [
        {
            to: "/items",
            label: "View Items",
            description: "Browse all inventory items",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            color: "from-blue-500 to-cyan-500",
            bg: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40",
        },
        {
            to: "/items/add",
            label: "Add Item",
            description: "Create a new inventory item",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            ),
            color: "from-emerald-500 to-teal-500",
            bg: "bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40",
        },
        {
            to: "/admin/register-user",
            label: "Register User",
            description: "Add a new system user",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            ),
            color: "from-purple-500 to-indigo-500",
            bg: "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40",
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                        <p className="text-slate-400 text-sm">
                            Welcome back, <span className="text-indigo-400 font-semibold">{user?.name || "Admin"}</span>
                            <span className="ml-2 text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`group flex items-start gap-4 p-5 rounded-xl border bg-slate-800/50 ${link.bg} transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                                {link.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-slate-100 group-hover:text-white transition-colors">{link.label}</p>
                                <p className="text-slate-400 text-sm mt-0.5">{link.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;