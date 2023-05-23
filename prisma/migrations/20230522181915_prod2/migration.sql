/*
  Warnings:

  - The primary key for the `like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `like` table. All the data in the column will be lost.
  - The primary key for the `vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `vote` table. All the data in the column will be lost.
  - Made the column `feedbackId` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `feedbackId` on table `report` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_feedbackId_fkey`;

-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_feedbackId_fkey`;

-- AlterTable
ALTER TABLE `comment` MODIFY `feedbackId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `like` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`authorId`, `feedbackId`);

-- AlterTable
ALTER TABLE `report` MODIFY `feedbackId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vote` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`authorId`, `feedbackId`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_feedbackId_fkey` FOREIGN KEY (`feedbackId`) REFERENCES `Feedback`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_feedbackId_fkey` FOREIGN KEY (`feedbackId`) REFERENCES `Feedback`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
