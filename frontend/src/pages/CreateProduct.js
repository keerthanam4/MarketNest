import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const handleCreate = async () => {
        console.log("FORCE UPDATE");
        console.log("NEW CODE RUNNING ✅");

        try {
            const token = localStorage.getItem("token");


            await API.post(
                "/api/products",
                {
                    title,
                    price,
                    category
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product Created ✅");
            navigate("/products");

        } catch (err) {
            console.error(err);
            alert("Error ❌");
        }
    };

    return (
        <div>
            <h2>Create Product</h2>

            <input
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
            />

            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select</option>
                <option value="clothing">Clothing</option>
                <option value="footwear">Footwear</option>
            </select>

            <button onClick={handleCreate}>Create</button>
        </div>
    );
}

export default CreateProduct;