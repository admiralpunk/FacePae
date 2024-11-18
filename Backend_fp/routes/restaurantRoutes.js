const { createRestaurant, loginRestaurant, profile, menu } = require("../controllers/restaurantController");
const express = require("express");
const authenticateRestaurant = require("../middlewares/authMiddleware");
const router = express.Router();
// Define routes
router.post("/create-restaurant", createRestaurant);
router.post("/login",loginRestaurant);
// Get restaurant info
router.get("/profile",authenticateRestaurant, profile);
router.get("/menu", authenticateRestaurant, menu);
module.exports = router;