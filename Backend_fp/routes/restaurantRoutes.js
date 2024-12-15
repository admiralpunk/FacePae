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
  getTable,
  addTable,
  getDish,
  getOrder,
  pay,
  updateOrder,
  handleOrder,
  postQR,
  getOrderId,
  getQr,
  toggle_live,
  summary
} = require("../controllers/restaurantController");
const express = require("express");
const authenticateRestaurant = require("../middlewares/authMiddleware");
const router = express.Router();
// Define routes
router.post("/create-restaurant", createRestaurant);
router.post("/login", loginRestaurant);
// Get restaurant info
router.get("/menu", menu);
router.get("/profile", authenticateRestaurant, profile);
router.post(
  "/add-dish",
  authenticateRestaurant,
  upload.single("image"),
  addDish
);
router.get("/categories/:id", authenticateRestaurant, category_dishes);
router.post("/post-order", handleOrder);
router.post("/update-order", updateOrder);
router.get("/image/:imageId", authenticateRestaurant, getImage);
router.get("/table/:orderId", authenticateRestaurant, getTable);
router.post("/addTable", authenticateRestaurant, addTable);
router.get("/dish/:dishId", authenticateRestaurant, getDish);
router.get("/order/:orderNo", authenticateRestaurant, getOrder);
router.post("/payment", authenticateRestaurant, pay);
router.post("/qr", authenticateRestaurant, upload.single("image"), postQR);
router.get("/:table_no", getOrderId);
router.get("/qr/:restaurantId", getQr);
router.post("/live",authenticateRestaurant, toggle_live);
router.get("/hello", (req, res) => {
  res.send("hello");
});

router.get("/dashboard-summary/:restaurantId", summary);

module.exports = router;
