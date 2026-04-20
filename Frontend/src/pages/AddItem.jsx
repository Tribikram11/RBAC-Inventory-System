import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddItem() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!name || !sku) {
            setError("Name and SKU are required");
            return;
        }
        setLoading(true);

        try {
            await api.post("/items", { name, sku, quantity, price });
            navigate("/items");
        } catch (error) {
            if (error.response?.data?.msg) {
                setError(error.response.data.msg);
            } else {
                setError("Failed to add item.");
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full bg-slate-900/60 border border-slate-600 text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";
    const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

    return (
        <div className="max-w-lg">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Add New Item</h1>
                <p className="text-slate-400 text-sm mt-1">Fill in the details below to add a new inventory item.</p>
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

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={labelClass}>Item Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Laptop, Mouse, Desk Chair"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>SKU</label>
                        <input
                            type="text"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            placeholder="e.g. LAP-001"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min="0"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Price (₹)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                min="0"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate("/items")}
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
                                    Saving...
                                </span>
                            ) : "Add Item"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddItem;