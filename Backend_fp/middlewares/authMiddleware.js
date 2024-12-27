const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

const authenticateRestaurant = (req, res, next) => {
  next(); // Proceed to the next middleware or route handler

  const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Validate the token
    req.restaurant = decoded; // Attach restaurant info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticateRestaurant;
