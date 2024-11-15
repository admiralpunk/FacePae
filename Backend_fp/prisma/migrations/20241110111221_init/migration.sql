/*
  Warnings:

  - Added the required column `restaurant_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `dish_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `order_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `payment_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `table_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "restaurant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "dish_images" ADD COLUMN     "restaurant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "menu_items" ADD COLUMN     "restaurant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "restaurant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order_table" ADD COLUMN     "restaurant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "payment_table" ADD COLUMN     "restaurant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "table_info" ADD COLUMN     "restaurant_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant_info"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_images" ADD CONSTRAINT "dish_images_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant_info"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant_info"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_info" ADD CONSTRAINT "table_info_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant_info"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_table" ADD CONSTRAINT "order_table_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant_info"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant_info"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_table" ADD CONSTRAINT "payment_table_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant_info"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
