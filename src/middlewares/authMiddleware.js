const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Check for authorization header
    const authHeader = req.headers.authorization; // Use lowercase 'authorization'
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied." });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied." });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid.", error: err.message });
        }

        // Attach user information to request object
        req.user = decoded;
        // Proceed to the next middleware
        next();
    });
};

module.exports = verifyToken;