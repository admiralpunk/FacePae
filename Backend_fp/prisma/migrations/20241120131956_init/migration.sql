/*
  Warnings:

  - Made the column `dish_id` on table `dish_images` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "dish_images" DROP CONSTRAINT "dish_images_dish_id_fkey";

-- AlterTable
ALTER TABLE "dish_images" ALTER COLUMN "dish_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "dish_images" ADD CONSTRAINT "dish_images_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "menu_items"("dish_id") ON DELETE RESTRICT ON UPDATE CASCADE;
