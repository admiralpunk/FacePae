
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

const profile =  async (req, res) => {
  try {
    const { restaurantId } = req.restaurant; // Extracted from token

    // Fetch restaurant details from the database
    const restaurant = await prisma.restaurant_info.findUnique({
      where: { restaurant_id: restaurantId },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    res.status(200).json({ restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { createRestaurant, loginRestaurant ,profile};
