/*
  Warnings:

  - A unique constraint covering the columns `[tokenId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `orders_tokenId_key` ON `orders`(`tokenId`);

-- CreateIndex
CREATE UNIQUE INDEX `orders_transactionId_key` ON `orders`(`transactionId`);
