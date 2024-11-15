/*
  Warnings:

  - The primary key for the `order_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customization` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `dish_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `order_items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_dish_id_fkey";

-- AlterTable
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_pkey",
DROP COLUMN "customization",
DROP COLUMN "dish_id",
DROP COLUMN "quantity",
ADD COLUMN     "order_details" JSONB[],
ADD CONSTRAINT "order_items_pkey" PRIMARY KEY ("order_id");
