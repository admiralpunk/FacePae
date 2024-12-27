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

module.exports = { emitOrderUpdates, mergeOrder, updateOrderStatus ,createOrder};
