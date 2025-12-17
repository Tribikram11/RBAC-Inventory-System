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
      return null;
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);


    if (!name || !sku) {
      setError("Name and SKU are required")
      return;
    }
    setLoading(true);

    try {
      await api.post("/items", {
        name, sku, quantity, price
      })
      navigate("/items");

    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg)
      } else {
        setError("Failed to add item.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>add new item</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: 10 }}>
          <label> Item Name</label>
          <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="enter the item name"
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label> SKU</label>
          <input type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="enter SKU"
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

        <button type="submit"
          disabled={loading}
          style={{
            padding: "10",
            width: "100%",
            cursor: loading ? "not-allowed" : "pointer"
          }}>
          {loading ? "Saving..." : "Add Item"}
        </button>

      </form>
    </div>
  )
}

export default AddItem;