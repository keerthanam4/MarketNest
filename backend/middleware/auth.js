const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ msg: "No token" });
        }

        // Handle both formats
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const decoded = jwt.verify(token, "secret");

        req.user = decoded;
        next();

    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = auth;