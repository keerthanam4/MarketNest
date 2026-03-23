const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
    createProduct,
    getProducts
} = require("../controllers/productController");
const { deleteProduct } = require("../controllers/productController");

const { getStats } = require("../controllers/productController");

router.get("/stats", auth, role("brand"), getStats);

router.delete("/:id", auth, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// only brand can create
router.post("/", auth, createProduct);

// anyone logged in can view
router.get("/", auth, getProducts);

module.exports = router;