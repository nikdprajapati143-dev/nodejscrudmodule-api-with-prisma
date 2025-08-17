-- DropIndex
DROP INDEX `PasswordResetToken_userId_fkey` ON `passwordresettoken`;

-- DropIndex
DROP INDEX `Token_userId_fkey` ON `token`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `profileImage` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
