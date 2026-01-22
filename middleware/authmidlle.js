const jwt = require("jsonwebtoken")

exports.protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader ) {
            return res.status(401).json({ msg: "Not authorized, no token" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: "Not authorized, token is missing" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        res.status(401).json({ msg: "Invalid or expired token", error: error.message })
    }
}