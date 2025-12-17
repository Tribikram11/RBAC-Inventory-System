import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function EditItem() {
  const { id } = useParams();          // item id from URL
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form state
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (user.role === "viewer") {
      navigate("/items");
    }
  }, [user, navigate]);
  // Fetch existing item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        const item = res.data;

        setName(item.name);
        setSku(item.sku);
        setQuantity(item.quantity);
        setPrice(item.price);
      } catch {
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !sku) {
      setError("Name and SKU are required.");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/items/${id}`, {
        name,
        sku,
        quantity,
        price,
      });

      navigate("/items");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Failed to update item.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <h2>Loading item...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Item</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>SKU</label>
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="0"
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min="0"
            style={{ width: "100%" }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "10px",
            width: "100%",
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Updating..." : "Update Item"}
        </button>
      </form>
    </div>
  );
}

export default EditItem;
