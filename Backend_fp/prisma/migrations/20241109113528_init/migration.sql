/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "menu_items" (
    "dish_id" SERIAL NOT NULL,
    "dish_name" TEXT NOT NULL,
    "dish_description" TEXT,
    "dish_live" BOOLEAN DEFAULT true,
    "dish_cost" DECIMAL(65,30) NOT NULL,
    "category_id" INTEGER,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("dish_id")
);

-- CreateTable
CREATE TABLE "dish_images" (
    "image_id" SERIAL NOT NULL,
    "dish_image" TEXT NOT NULL,
    "dish_id" INTEGER,

    CONSTRAINT "dish_images_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "table_info" (
    "table_no" SERIAL NOT NULL,
    "seating_capacity" INTEGER NOT NULL,

    CONSTRAINT "table_info_pkey" PRIMARY KEY ("table_no")
);

-- CreateTable
CREATE TABLE "order_table" (
    "order_id" SERIAL NOT NULL,
    "table_no" INTEGER NOT NULL,

    CONSTRAINT "order_table_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "order_id" INTEGER NOT NULL,
    "dish_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "customization" TEXT,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("order_id","dish_id")
);

-- CreateTable
CREATE TABLE "payment_table" (
    "order_id" INTEGER NOT NULL,
    "table_no" INTEGER,
    "payment_type" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_table_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "restaurant_info" (
    "restaurant_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "qr_code" TEXT NOT NULL,

    CONSTRAINT "restaurant_info_pkey" PRIMARY KEY ("restaurant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_category_name_key" ON "categories"("category_name");

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_images" ADD CONSTRAINT "dish_images_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "menu_items"("dish_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_table" ADD CONSTRAINT "order_table_table_no_fkey" FOREIGN KEY ("table_no") REFERENCES "table_info"("table_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order_table"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "menu_items"("dish_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_table" ADD CONSTRAINT "payment_table_table_no_fkey" FOREIGN KEY ("table_no") REFERENCES "table_info"("table_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_table" ADD CONSTRAINT "payment_table_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order_table"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
