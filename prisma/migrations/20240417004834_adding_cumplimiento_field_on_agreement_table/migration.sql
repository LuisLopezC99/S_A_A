/*
  Warnings:

  - A unique constraint covering the columns `[reportCumplimiento]` on the table `tab_agreement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reportCumplimiento` to the `tab_agreement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tab_agreement` ADD COLUMN `reportCumplimiento` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tab_agreement_reportCumplimiento_key` ON `tab_agreement`(`reportCumplimiento`);
