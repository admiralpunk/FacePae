const prisma = require("../models/prismaClient");

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

async function createOrMergeOrder(orderData) {
  const existingOrder = await prisma.order_table.findUnique({
    where: { order_id: orderData.order_id ,order_status: orderData.order_status},
    include: { order_items: true },
  });

  if (existingOrder) {
    await prisma.order_items.updateMany({
      where: { order_id: orderData.order_id },
      data: {
        order_details: {
          push: orderData.order_details,
        },
      },
    });
    console.log(
      `Merged new items into existing order ID ${orderData.order_id}`
    );
  } else {
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
}

async function updateOrderStatus(orderId, status) {
  await prisma.order_items.updateMany({
    where: { order_id: orderId },
    data: { order_status: status },
  });
  console.log(`Order ${orderId} status updated to ${status}`);
}

module.exports = { emitOrderUpdates, createOrMergeOrder, updateOrderStatus };
