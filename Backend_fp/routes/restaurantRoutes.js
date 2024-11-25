const multer = require("multer");
const upload = multer();
const {
  createRestaurant,
  loginRestaurant,
  profile,
  menu,
  addDish,
  category_dishes,
  postOrder,
  payment,
  getImage,
} = require("../controllers/restaurantController");
const express = require("express");
const authenticateRestaurant = require("../middlewares/authMiddleware");
const router = express.Router();
// Define routes
router.post("/create-restaurant", createRestaurant);
router.post("/login", loginRestaurant);
// Get restaurant info
router.get("/profile", authenticateRestaurant, profile);
router.get("/menu", authenticateRestaurant, menu);
router.post(
  "/add-dish",
  authenticateRestaurant,
  upload.single("image"),
  addDish
);
router.get("/categories/:id", authenticateRestaurant, category_dishes);
router.post("/post-order", authenticateRestaurant, postOrder);
router.post("/payment", authenticateRestaurant, payment);
router.get("/image/:imageId", authenticateRestaurant, getImage);

module.exports = router;
