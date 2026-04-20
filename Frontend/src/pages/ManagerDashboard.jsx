import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ManagerDashboard() {
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
            to: "/items",
            label: "Edit Stock",
            description: "Managers can update stock levels",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            color: "from-orange-500 to-amber-500",
            bg: "bg-orange-500/10 border-orange-500/20 hover:border-orange-500/40",
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Manager Dashboard</h1>
                        <p className="text-slate-400 text-sm">
                            Welcome back, <span className="text-blue-400 font-semibold">{user?.name || "Manager"}</span>
                            <span className="ml-2 text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickLinks.map((link, i) => (
                        <Link
                            key={i}
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

export default ManagerDashboard;
