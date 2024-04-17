/*
  Warnings:

  - A unique constraint covering the columns `[report]` on the table `tab_agreement` will be added. If there are existing duplicate values, this will fail.
  - Made the column `report` on table `tab_agreement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tab_agreement` MODIFY `report` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tab_agreement_report_key` ON `tab_agreement`(`report`);
