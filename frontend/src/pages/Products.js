import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const getProducts = async () => {
        const token = localStorage.getItem("token");

        console.log("Search:", search);
        console.log("Category:", category);
        console.log(`/products?search=${search}&category=${category}&page=${page}`);

        const res = await API.get(
            `/products?search=${search}&category=${category}&page=${page}`,
            {
                headers: {
                    authorization: token
                }
            }
        );

        console.log("API Response:", res.data); // 

        setProducts(res.data); // 
    };

    useEffect(() => {
        getProducts();
    }, [search, category, page]);

    return (
        <div>
            {/* 👉 ADD THIS BUTTON AT TOP */}
            <button onClick={() => navigate("/create")}>
                ➕ Create Product
            </button>

            <h2>Products</h2>

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
                .filter(p => p.title && p.price) //  FILTER BAD DATA
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