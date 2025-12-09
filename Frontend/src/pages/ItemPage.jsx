import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";


function ItemsPage(){
    const [items, setItems] = useState("");
    const [loadng, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {user} = useAuth();
    
    useEffect(() => {
        function fetchItems(){
          
        }
    },[])





}