/*
  Warnings:

  - Changed the type of `dish_image` on the `dish_images` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "dish_images" DROP COLUMN "dish_image",
ADD COLUMN     "dish_image" BYTEA NOT NULL;
