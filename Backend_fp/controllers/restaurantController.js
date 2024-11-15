import prisma from "./dbconfig.js";
import express from "express";

const app = express();
app.use(express.json());

app.post("/create-restaurant", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if restaurant already exists
    const findRestaurant = await prisma.restaurant_info.findUnique({
      where: {
        email: email,
      },
    });

    if (findRestaurant) {
      return res.json({
        status: 400,
        message: "Email already taken. Please use another email.",
      });
    }

    // Create a new restaurant
    const newRestaurant = await prisma.restaurant_info.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return res.json({
      status: 200,
      data: newRestaurant,
      msg: "Restaurant created successfully.",
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.json({
      status: 500,
      message: "Internal server error.",
    });
  }
});
