/*
  Warnings:

  - The `qr_code` column on the `restaurant_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "restaurant_info" DROP COLUMN "qr_code",
ADD COLUMN     "qr_code" BYTEA;
