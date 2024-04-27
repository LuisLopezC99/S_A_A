/*
  Warnings:

  - Added the required column `reminderDate` to the `tab_agreement` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `tab_agreement_report_key` ON `tab_agreement`;

-- AlterTable
ALTER TABLE `tab_agreement` ADD COLUMN `reminderDate` DATE NOT NULL;
