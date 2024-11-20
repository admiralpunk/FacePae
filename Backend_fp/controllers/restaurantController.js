const prisma = require("../models/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key_here"; // Secure your key in .env

// Create Restaurant
const createRestaurant = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if restaurant already exists
    const existingRestaurant = await prisma.restaurant_info.findUnique({
      where: { email },
    });

    if (existingRestaurant) {
      return res.status(400).json({
        error: "Email already taken. Please use another email.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new restaurant
    const newRestaurant = await prisma.restaurant_info.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      data: newRestaurant,
      message: "Restaurant created successfully.",
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({
      error: "Internal server error.",
    });
  }
};

// Login Restaurant
const loginRestaurant = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Find restaurant by email
    const restaurant = await prisma.restaurant_info.findUnique({
      where: { email },
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, restaurant.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Generate JWT
    const token = jwt.sign(
      { restaurantId: restaurant.restaurant_id, email: restaurant.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const profile = async (req, res) => {
  try {
    const { restaurantId } = req.restaurant; // Extracted from token

    // Fetch restaurant details from the database
    const restaurant = await prisma.restaurant_info.findUnique({
      where: { restaurant_id: restaurantId },
    });
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    res.status(200).json({ restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const menu = async (req, res) => {
  try {
    const { restaurantId } = req.restaurant; // Extracted from the token by the `authenticateToken` middleware
    const menuItems = await prisma.menu_items.findMany({
      where: { restaurant_id: restaurantId },
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).send("Error fetching menu items");
  }
};

const addDish = async (req, res) => {
  const { dish_name, dish_description, dish_cost, category_id, dish_image } =
    req.body;
  const restaurantId = req.restaurant?.restaurantId; // Ensure optional chaining in case `req.restaurant` is undefined

  // Validate input
  if (!dish_name || !dish_cost || !restaurantId) {
    return res
      .status(400)
      .json({ message: "Required fields: dish_name, dish_cost" });
  }

  try {
    // Create new dish
    const newDish = await prisma.menu_items.create({
      data: {
        dish_name,
        dish_description,
        dish_cost,
        category_id,
        restaurant_id: restaurantId,
      },
    });
    if (dish_image) {
      await prisma.dish_images.create({
        data: {
          dish_image,
          dish_id: newDish.dish_id,
          restaurant_id: restaurantId,
        },
      });
    }

    res.status(201).json({ message: "Dish added successfully", dish: newDish , image: dish_image});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const category_dishes = async (req, res) => {
  const { id } = req.params;
  const restaurantId = req.restaurant?.restaurantId;
  try {
    // Find the category to ensure it exists
    const category = await prisma.categories.findUnique({
      where: {
        category_id: parseInt(id, 10),
        restaurant_id: restaurantId,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Retrieve all dishes associated with the category
    const dishes = await prisma.menu_items.findMany({
      where: {
        category_id: parseInt(id, 10),
        restaurant_id: restaurantId,
      },
      include: {
        restaurant_rel: true, // Include related restaurant info if needed
      },
    });

    res.status(200).json({ category: category.category_name, dishes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const postOrder = async (req, res) => {
  const { tableNo, orderDetails } = req.body;
  const restaurantId = req.restaurant?.restaurantId;
  try {
    // Create order in the order_table
    const newOrder = await prisma.order_table.create({
      data: {
        table_no: tableNo,
        restaurant_id: restaurantId,
        order_items: {
          create: {
            order_details: orderDetails,
            order_status: 0,
            restaurant_id: restaurantId,
          },
        },
      },
      include: {
        order_items: true,
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const payment = async (req, res) => {
  try {
    const { order_id, table_no, payment_type, amount, restaurant_id } =
      req.body;

    // Validate the required fields
    if (!order_id || !payment_type || !amount || !restaurant_id) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    const payment = await prisma.payment_table.create({
      data: {
        order_id,
        table_no,
        payment_type,
        amount,
        restaurant_id,
        timestamp: new Date(),
      },
    });

    return res
      .status(201)
      .json({ message: "Payment created successfully", payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = {
  createRestaurant,
  loginRestaurant,
  profile,
  menu,
  addDish,
  category_dishes,
  postOrder,
  payment,
};
