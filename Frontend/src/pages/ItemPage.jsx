import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";

function ItemPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        const fetchitems = async () => {
            setLoading(true);
            try {
                const res = await api.get("/items");
                setItems(res.data);
            } catch {
                setError("Failed to load items");
            } finally {
                setLoading(false);
            }
        };
        fetchitems();
    }, []);

    const handleDelete = async (id) => {
        if (user.role !== "admin") return;
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;
        try {
            await api.delete(`/items/${id}`);
            setItems((prev) => prev.filter((item) => item._id !== id));
        } catch {
            alert("Failed to delete item");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="flex items-center gap-3 text-slate-400">
                    <svg className="animate-spin h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Loading items...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-5 py-4 mt-4">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Inventory Items</h1>
                    <p className="text-slate-400 text-sm mt-0.5">{items.length} item{items.length !== 1 ? "s" : ""} total</p>
                </div>
                {user.role === "admin" && (
                    <Link
                        to="/items/add"
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Item
                    </Link>
                )}
            </div>

            {/* Table / Empty */}
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <p className="text-slate-400 font-medium">No items found</p>
                    <p className="text-slate-600 text-sm mt-1">Add your first inventory item to get started.</p>
                </div>
            ) : (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-700/50">
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Name</th>
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">SKU</th>
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Quantity</th>
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Price</th>
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Last Updated</th>
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Updated By</th>
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/30">
                                {items.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-700/20 transition-colors">
                                        <td className="px-5 py-4 font-medium text-slate-200">{item.name}</td>
                                        <td className="px-5 py-4">
                                            <code className="text-xs bg-slate-700/60 text-slate-300 px-2 py-1 rounded-md font-mono">{item.sku}</code>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`font-semibold ${item.quantity < 10 ? "text-red-400" : item.quantity < 50 ? "text-amber-400" : "text-emerald-400"}`}>
                                                {item.quantity}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-slate-300">₹{item.price}</td>
                                        <td className="px-5 py-4 text-slate-400 text-xs">
                                            {new Date(item.lastUpdatedAt).toLocaleString()}
                                        </td>
                                        <td className="px-5 py-4 text-slate-400">{item.lastUpdatedBy?.name || "Unknown"}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                {(user.role === "admin" || user.role === "manager") && (
                                                    <Link
                                                        to={`/items/edit/${item._id}`}
                                                        className="px-3 py-1.5 text-xs font-medium text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg transition-all"
                                                    >
                                                        Edit
                                                    </Link>
                                                )}
                                                {user.role === "admin" && (
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="px-3 py-1.5 text-xs font-medium text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                                {user.role === "viewer" && (
                                                    <span className="text-xs text-slate-500 italic">View only</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemPage;