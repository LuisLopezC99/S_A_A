/*
  Warnings:

  - A unique constraint covering the columns `[consecutive,year,type]` on the table `tab_session_id` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `tab_session_id` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `tab_session_id_consecutive_year_key` ON `tab_session_id`;

-- AlterTable
ALTER TABLE `tab_session_id` ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tab_session_id_consecutive_year_type_key` ON `tab_session_id`(`consecutive`, `year`, `type`);
