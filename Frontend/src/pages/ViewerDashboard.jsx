import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ViewerDashboard() {
    const { user } = useAuth();

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Viewer Dashboard</h1>
                        <p className="text-slate-400 text-sm">
                            Welcome back, <span className="text-emerald-400 font-semibold">{user?.name || "Viewer"}</span>
                            <span className="ml-2 text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Access */}
            <div>
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Your Access</h2>
                <Link
                    to="/items"
                    className="group flex items-start gap-4 p-5 rounded-xl border bg-slate-800/50 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl max-w-sm"
                >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-100 group-hover:text-white transition-colors">View Items</p>
                        <p className="text-slate-400 text-sm mt-0.5">Read-only access to inventory</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default ViewerDashboard;
