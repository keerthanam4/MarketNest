import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const getProducts = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get(
                `/api/products?search=${search}&category=${category}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            setProducts(res.data);
            console.log("PRODUCTS:", res.data);

        } catch (err) {
            console.log(err);
        }
    }, [search, category]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <div>
            <button onClick={() => navigate("/create")}>
                ➕ Create Product
            </button>

            <h2>Products</h2>

            {/* Empty message */}
            {products.length === 0 && <p>No products found</p>}

            {/* Search + Filter */}
            <input
                placeholder="Search product title..."
                onChange={(e) => setSearch(e.target.value)}
            />

            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">All</option>
                <option value="clothing">Clothing</option>
                <option value="footwear">Footwear</option>
            </select>

            <button onClick={getProducts}>Search</button>

            {/* Product List */}
            {products
                .filter(p => p.title && p.price)
                .map((p) => (
                    <div key={p._id}>
                        <h3>{p.title}</h3>
                        <p>Price: {p.price}</p>
                        <p>Category: {p.category}</p>
                    </div>
                ))}

            {/* Pagination */}
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Prev
            </button>

            <span> Page {page} </span>

            <button onClick={() => setPage(page + 1)}>
                Next
            </button>
        </div>
    );
}

export default Products;