const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/protected", auth, (req, res) => {
    res.json({
        message: "Protected route",
        user: req.user
    });
});

// NEW: only brand can access
router.get("/brand-only", auth, role("brand"), (req, res) => {
    res.json("Welcome Brand!");
});

module.exports = router;