/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `restaurant_info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "restaurant_info_email_key" ON "restaurant_info"("email");
