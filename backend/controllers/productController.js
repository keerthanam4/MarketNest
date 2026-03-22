const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            createdBy: req.user.id
        });

        res.json(product);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getProducts = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 5 } = req.query;

        let filter = {};

        // search
        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        // filter
        if (category) {
            filter.category = category;
        }

        // pagination logic
        const products = await Product
            .find({
                ...filter,
                $or: [
                    { isDeleted: false },
                    { isDeleted: { $exists: false } }
                ]
            })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(products);

    } catch (err) {
        res.status(500).json(err.message);
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json("Product not found");

        // ownership check
        if (product.createdBy.toString() !== req.user.id) {
            return res.status(403).json("Not your product");
        }

        // soft delete
        product.isDeleted = true;
        await product.save();

        res.json("Product soft deleted");

    } catch (err) {
        res.status(500).json(err.message);
    }
};
exports.getStats = async (req, res) => {
    try {
        const total = await Product.countDocuments();

        const active = await Product.countDocuments({
            $or: [
                { isDeleted: false },
                { isDeleted: { $exists: false } }
            ]
        });

        const deleted = await Product.countDocuments({ isDeleted: true });

        res.json({
            totalProducts: total,
            activeProducts: active,
            deletedProducts: deleted
        });

    } catch (err) {
        res.status(500).json(err.message);
    }
};