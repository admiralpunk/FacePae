/*
  Warnings:

  - A unique constraint covering the columns `[table_name,restaurant_id]` on the table `table_info` will be added. If there are existing duplicate values, this will fail.
  - Made the column `table_no` on table `payment_table` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `table_name` to the `table_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment_table" DROP CONSTRAINT "payment_table_table_no_fkey";

-- AlterTable
ALTER TABLE "payment_table" ALTER COLUMN "table_no" SET NOT NULL;

-- AlterTable
ALTER TABLE "table_info" ADD COLUMN     "table_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "table_info_table_name_restaurant_id_key" ON "table_info"("table_name", "restaurant_id");

-- AddForeignKey
ALTER TABLE "payment_table" ADD CONSTRAINT "payment_table_table_no_fkey" FOREIGN KEY ("table_no") REFERENCES "table_info"("table_no") ON DELETE RESTRICT ON UPDATE CASCADE;
