-- CreateTable
CREATE TABLE `tab_log_operations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `operation_id` INTEGER NOT NULL,
    `timestamp` DATE NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tab_log_operations` ADD CONSTRAINT `tab_log_operations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tab_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tab_log_operations` ADD CONSTRAINT `tab_log_operations_operation_id_fkey` FOREIGN KEY (`operation_id`) REFERENCES `tab_operations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
