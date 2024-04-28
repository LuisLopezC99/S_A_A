-- CreateTable
CREATE TABLE `tab_session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_date` DATE NOT NULL,
    `report` VARCHAR(191) NULL,
    `session_type` VARCHAR(191) NOT NULL,
    `facebook_link` VARCHAR(191) NOT NULL,
    `session_consecutive` INTEGER NOT NULL,

    UNIQUE INDEX `tab_session_report_key`(`report`),
    UNIQUE INDEX `tab_session_facebook_link_key`(`facebook_link`),
    UNIQUE INDEX `tab_session_session_consecutive_key`(`session_consecutive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_agreement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agreement_topic` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `report` VARCHAR(191) NOT NULL,
    `reportCumplimiento` VARCHAR(191) NULL,
    `asigned_to` INTEGER NOT NULL,
    `creationDate` DATE NOT NULL,
    `deadline` DATE NOT NULL,
    `reminderDate` DATE NOT NULL,
    `session_id` INTEGER NOT NULL,
    `agreementIdConsecutive` INTEGER NOT NULL,
    `state` VARCHAR(191) NULL,

    UNIQUE INDEX `tab_agreement_reportCumplimiento_key`(`reportCumplimiento`),
    UNIQUE INDEX `tab_agreement_agreementIdConsecutive_key`(`agreementIdConsecutive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_agreement_id` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consecutive` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,

    UNIQUE INDEX `tab_agreement_id_consecutive_year_key`(`consecutive`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_session_id` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consecutive` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,

    UNIQUE INDEX `tab_session_id_consecutive_year_key`(`consecutive`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `FirstTime` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tab_user_name_key`(`name`),
    UNIQUE INDEX `tab_user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_operations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_role_operations` (
    `role_id` INTEGER NOT NULL,
    `operation_id` INTEGER NOT NULL,

    PRIMARY KEY (`role_id`, `operation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tab_session` ADD CONSTRAINT `tab_session_session_consecutive_fkey` FOREIGN KEY (`session_consecutive`) REFERENCES `tab_session_id`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tab_agreement` ADD CONSTRAINT `tab_agreement_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `tab_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tab_agreement` ADD CONSTRAINT `tab_agreement_agreementIdConsecutive_fkey` FOREIGN KEY (`agreementIdConsecutive`) REFERENCES `tab_agreement_id`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tab_agreement` ADD CONSTRAINT `tab_agreement_asigned_to_fkey` FOREIGN KEY (`asigned_to`) REFERENCES `tab_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tab_user` ADD CONSTRAINT `tab_user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `tab_role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tab_role_operations` ADD CONSTRAINT `tab_role_operations_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `tab_role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tab_role_operations` ADD CONSTRAINT `tab_role_operations_operation_id_fkey` FOREIGN KEY (`operation_id`) REFERENCES `tab_operations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
