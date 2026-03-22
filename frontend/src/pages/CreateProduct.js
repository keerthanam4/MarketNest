import { useState } from "react";
import API from "../services/api";

function CreateProduct() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const handleCreate = async () => {
        if (!title || !price || !category) {
            alert("Please fill all fields");
            return;
        }

        const token = localStorage.getItem("token");

        await API.post(
            "/products",
            { title, price, category },
            {
                headers: { authorization: token }
            }
        );

        alert("Product Created");
    };

    return (
        <div>
            <h2>Create Product</h2>

            <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />

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