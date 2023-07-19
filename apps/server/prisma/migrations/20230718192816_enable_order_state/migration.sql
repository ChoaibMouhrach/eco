/*
  Warnings:

  - Added the required column `orderStateId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `orderStateId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_orderStateId_fkey` FOREIGN KEY (`orderStateId`) REFERENCES `orderStates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
