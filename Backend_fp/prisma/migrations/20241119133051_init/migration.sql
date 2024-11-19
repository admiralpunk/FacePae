/*
  Warnings:

  - A unique constraint covering the columns `[order_no]` on the table `order_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "order_items_order_no_key" ON "order_items"("order_no");
