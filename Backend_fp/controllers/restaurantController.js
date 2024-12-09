const prisma = require("../models/prismaClient");
const bcrypt = require("bcrypt");
const { parse } = require("dotenv");
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
      { expiresIn: "5h" }
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

    const tables = await prisma.table_info.findMany({
      where: { restaurant_id: restaurantId },
      // select: { table_name: true },
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    res.status(200).json({ restaurant, tables });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const menu = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    // Fetch menu items with associated dish images
    const menuItems = await prisma.menu_items.findMany({
      where: { restaurant_id: restaurantId },
      include: {
        dish_images: true, // Include dish images
      },
    });

    // Transform the response to include images as base64
    const menuWithImages = menuItems.map((item) => ({
      ...item,
      dish_images: item.dish_images.map((image) => ({
        ...image,
        dish_image: image.dish_image.toString("base64"), // Convert image bytes to base64
      })),
    }));

    // Set content type and return response
    res.setHeader("Content-Type", "application/json");
    res.json(menuWithImages);
  } catch (error) {
    console.error("Error fetching menu items:", error);
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
        category_id: parseInt(category_id),
        restaurant_id: restaurantId,
      },
    });
    // if (dish_image) {
    await prisma.dish_images.create({
      data: {
        dish_image: req.file.buffer,
        dish_id: newDish.dish_id,
        restaurant_id: restaurantId,
      },
    });
    // }

    res.status(201).json({
      message: "Dish added successfully",
      dish: newDish,
      image: dish_image,
    });
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
const getImage = async (req, res) => {
  const { imageId } = req.params;
  try {
    const image = await prisma.dish_images.findUnique({
      where: {
        image_id: parseInt(imageId, 10),
        restaurant_id: req.restaurant.restaurantId,
      },
    });
    // if (!image) {
    //   return res.status(404).json({ message: "Image not found" });
    // }
    // res.status(200).json({ image: image.dish_image });

    if (image && image.dish_image) {
      res.set("Content-Type", "image/jpeg"); // Ensure the Content-Type matches the image format
      res.send(image.dish_image); // Send raw binary image data
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const postOrder = async (req, res) => {
  const { tableNo, orderDetails, restaurantId } = req.body;
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
const handleOrder = async (req, res) => {
  const { tableNo, orderDetails, restaurantId } = req.body;

  try {
    // Check if an existing order exists with order_status 0 or 1
    const existingOrder = await prisma.order_table.findFirst({
      where: {
        table_no: tableNo,
        restaurant_id: parseInt(restaurantId),
        order_items: {
          some: {
            order_status: {
              in: [0, 1], // Check for status 0 or 1
            },
          },
        },
      },
      orderBy: { order_id: "desc" },
    });

    if (!existingOrder) {
      // Create a new order if no valid existing order is found
      const newOrder = await prisma.order_table.create({
        data: {
          table_no: tableNo,
          restaurant_id: parseInt(restaurantId),
          order_items: {
            create: {
              order_details: orderDetails,
              order_status: 0,
              restaurant_id: parseInt(restaurantId),
            },
          },
        },
        include: {
          order_items: true,
        },
      });

      return res.status(201).json({
        message: "Order created successfully",
        order: newOrder,
      });
    }

    // Add new order items to the existing order
    const updatedOrder = await prisma.order_items.create({
      data: {
        order_details: orderDetails,
        order_status: 0,
        restaurant_id: parseInt(restaurantId),
        order_id: existingOrder.order_id,
      },
    });

    res.status(200).json({
      message: "New order item added successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error handling order:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { tableNo, orderDetails, restaurantId } = req.body; // Get the order ID from the request body
  try {
    const orderId = await prisma.order_table.findFirst({
      where: { table_no: tableNo, restaurant_id: parseInt(restaurantId) },
      orderBy: {
        order_id: "desc",
      },
    });
    if (!orderId) return res.status(404).json({ message: "Table not found" });
    const newOrder = await prisma.order_items.create({
      data: {
        order_details: orderDetails,
        order_status: 0,
        restaurant_id: parseInt(restaurantId),
        order_id: parseInt(orderId.order_id),
      },
    });
    res
      .status(200)
      .json({ message: "new updated order has been added.", order: newOrder });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
// const payment = async (req, res) => {
//   try {
//     const { order_id, table_no, payment_type, amount, restaurant_id } =
//       req.body;

//     // Validate the required fields
//     if (!order_id || !payment_type || !amount || !restaurant_id) {
//       return res.status(400).json({ message: "Missing required fields!" });
//     }

//     const payment = await prisma.payment_table.create({
//       data: {
//         order_id,
//         table_no,
//         payment_type,
//         amount,
//         restaurant_id,
//         timestamp: new Date(),
//       },
//     });

//     return res
//       .status(201)
//       .json({ message: "Payment created successfully", payment });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error!" });
//   }
// };

const getTable = async (req, res) => {
  try {
    const { orderId } = req.params;
    const tableNo = await prisma.order_table.findUnique({
      where: {
        order_id: parseInt(orderId, 10),
        restaurant_id: req.restaurant.restaurantId,
      },
      select: { table_no: true },
    });
    if (!tableNo) {
      return res.status(404).json({ message: "Table not found" });
    }

    const tableName = await prisma.table_info.findUnique({
      where: {
        table_no: tableNo.table_no,
        restaurant_id: req.restaurant.restaurantId,
      },
      select: { table_name: true },
    });
    res.status(200).json({ tableName });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const addTable = async (req, res) => {
  try {
    const { table_name, seating_capacity } = req.body;
    const restaurantId = req.restaurant?.restaurantId;
    const newTable = await prisma.table_info.create({
      data: {
        table_name,
        restaurant_id: restaurantId,
        seating_capacity: seating_capacity || 4,
      },
    });
    res
      .status(201)
      .json({ message: "Table added successfully", table: newTable });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const dish = await prisma.menu_items.findUnique({
      where: {
        dish_id: parseInt(dishId, 10),
        restaurant_id: req.restaurant.restaurantId,
      },
    });
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.status(200).json({ dish });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getOrder = async (req, res) => {
  const { orderNo } = req.params;

  try {
    // Fetch the order and its items
    const order = await prisma.order_items.findMany({
      where: { order_no: parseInt(orderNo) },
      select: {
        order_details: true, // JSON array
      },
    });

    if (order.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Parse `order_details` to get each dish_id, quantity, and customization
    const orderDetails = order.flatMap((o) => o.order_details);

    const dishDetails = await Promise.all(
      orderDetails.map(async (item) => {
        const dish = await prisma.menu_items.findUnique({
          where: { dish_id: parseInt(item.dish_id) },
          select: { dish_name: true },
        });

        return {
          dish_name: dish?.dish_name || "Unknown dish",
          quantity: item.quantity,
          customization: item.customization || null,
        };
      })
    );

    res.json(dishDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const postQR = async (req, res) => {
  const { restaurantId } = req.restaurant;
  try {
    await prisma.restaurant_info.update({
      where: { restaurant_id: restaurantId },
      data: {
        qr_code: req.file.buffer,
      },
    });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "QR Code added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const pay = async (req, res) => {
  const { order_id, order_no, table_no, payment_type, amount, restaurant_id } =
    req.body;

  // Validate the request body
  if (!order_id || !table_no || !payment_type || !amount || !restaurant_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Create a new payment record
    const payment = await prisma.payment_table.create({
      data: {
        order_id,
        table_no,
        payment_type,
        amount,
        restaurant_id,
      },
    });

    await prisma.order_items.updateMany({
      where: { order_no: order_no },
      data: { order_status: 2 },
    });

    res.status(201).json({
      message: "Payment record added successfully",
      payment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getQr = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const qrCode = await prisma.restaurant_info.findUnique({
      where: { restaurant_id: parseInt(restaurantId) },
      select: { qr_code: true },
    });
    if (!qrCode) {
      return res.status(404).json({ message: "QR code not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(qrCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

const getOrderId = async (req, res) => {
  try {
    const { table_no } = req.params;
    const order = await prisma.order_table.findFirst({
      where: { table_no: parseInt(table_no) },
      select: { order_no: true },
      orderBy: { order_id: "desc" }
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
module.exports = {
  createRestaurant,
  loginRestaurant,
  profile,
  menu,
  addDish,
  category_dishes,
  postOrder,
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
  getQr
};
