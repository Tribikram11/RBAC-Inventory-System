import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";


function ItemPage() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const { user } = useAuth();

  useEffect(() => {
    const fetchitems = async () => {
      setLoading(true)
      try {
        const res = await api.get("/items");
        setItems(res.data);
      } catch  {
        setError("failed to get items")
      } finally {
        setLoading(false)
      }
    }
    fetchitems()
  }, [])

  const handleDelete = async (id) => {
    if (user.role !== "admin") return;

    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/items/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id))
    } catch  {
      alert("failed to delete items")
    }
  }

  if (loading) return <h2>loading items ...</h2>
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>

  return (
    <div style={{ padding: 20 }}>
      <h1>Items</h1>

      {/* admin only */}
      {
        user.role == "admin" && (
          <Link to="/items/add">
            <button style={{ marginBottom: 20 }}>add new item</button>
          </Link>
        )
      }

      {/* table */}
      {items.length === 0 ? (
        <p>no items found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Last Updated</th>
              <th>Updated By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>{new Date(item.lastUpdatedAt).toLocaleString()}</td>
                <td>{item.lastUpdatedBy?.name || "Unknown"}</td>

                <td>
                  {/* Manager + Admin → Edit */}
                  {(user.role === "admin" || user.role === "manager") && (
                    <Link to={`/items/edit/${item._id}`}>
                      <button>Edit</button>
                    </Link>
                  )}

                  {/* Admin → Delete */}
                  {user.role === "admin" && (
                    <button
                      onClick={() => handleDelete(item._id)}
                      style={{ marginLeft: 8, color: "red" }}
                    >
                      Delete
                    </button>
                  )}

                  {/* Viewer → No actions */}
                  {user.role === "viewer" && <span>View only</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ItemPage;