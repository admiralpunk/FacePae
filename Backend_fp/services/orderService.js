const prisma = require("../models/prismaClient");
const { io } = require( "../config/socket");
async function emitOrderUpdates(io) {

  const newOrders = await prisma.order_table.findMany({
    where: { order_items: { some: { order_status: 0 } } },
    include: { order_items: true },
  });

  const preparingOrders = await prisma.order_table.findMany({
    where: { order_items: { some: { order_status: 1 } } },
    include: { order_items: true },
  });

  const finishedOrders = await prisma.order_table.findMany({
    where: { order_items: { some: { order_status: 2 } } },
    include: { order_items: true },
  });
  
  io.emit("orderUpdate", { newOrders, preparingOrders, finishedOrders });
}


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
    await emitOrderUpdates(io);

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

      await emitOrderUpdates(io);

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
    await emitOrderUpdates(io);

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

async function mergeOrder(order_no, status, order_id, order_details) {
  // Find the existing order with matching ID and status
  const existingOrder = await prisma.order_items.findFirst({
    where: {
      order_id: parseInt(order_id), // Convert to integer to match the data type of order_id,
      order_status: status,
    },
  });

  if (existingOrder) {
    // Combine existing and new order details
    // const updatedOrderDetails = [
    //   ...existingOrder.order_details,
    //   ...order_details,
    // ];

    const updatedOrderDetails = [
      ...(Array.isArray(existingOrder.order_details)
        ? existingOrder.order_details
        : []),
      ...order_details,
    ];

    // Update the existing order with new details
    await prisma.order_items.updateMany({
      where: {
        order_id: parseInt(order_id),
        order_status: status, 
      },
      data: {
        order_details: updatedOrderDetails,
      },
    });

    // Delete the original order item
    await prisma.order_items.delete({
      where: { order_no: order_no },
    });

    console.log(
      `Merged new items into existing order ID ${existingOrder.order_id}`
    );
    return 1;
  }

  return 0; // Return 0 if no matching existing order is found
}


async function createOrder(orderData){
    await prisma.order_table.create({
      data: {
        ...orderData,
        order_items: {
          create: orderData.order_items,
        },
      },
    });
    console.log(`New order created with ID ${orderData.order_id}`);
}

async function updateOrderStatus(order_no, status) {
  console.log(order_no);
  await prisma.order_items.updateMany({
    where: { order_no: order_no },
    data: { order_status: status },
  });
  console.log(`Order No. ${order_no} status updated to ${status}`);
}

module.exports = { emitOrderUpdates, mergeOrder, updateOrderStatus ,createOrder,handleOrder};
