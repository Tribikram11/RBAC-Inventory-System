import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user.role !== "admin") {
    navigate("/");
    return null;

  }

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);


    if (!name || !sku) {
      setError("Name and SKU are required")
      return;
    }
    setLoading(true);

    try {

    } catch (error) {

    }
  }
}