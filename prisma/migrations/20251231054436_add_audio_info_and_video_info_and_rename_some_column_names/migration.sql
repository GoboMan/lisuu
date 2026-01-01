/*
  Warnings:

  - You are about to drop the column `duration` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `fileSize` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Playlist` DROP FOREIGN KEY `Playlist_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PlaylistTrack` DROP FOREIGN KEY `PlaylistTrack_playlistId_fkey`;

-- DropForeignKey
ALTER TABLE `PlaylistTrack` DROP FOREIGN KEY `PlaylistTrack_trackId_fkey`;

-- DropForeignKey
ALTER TABLE `Track` DROP FOREIGN KEY `Track_userId_fkey`;

-- DropIndex
DROP INDEX `Playlist_userId_fkey` ON `Playlist`;

-- DropIndex
DROP INDEX `PlaylistTrack_trackId_fkey` ON `PlaylistTrack`;

-- DropIndex
DROP INDEX `Track_userId_fkey` ON `Track`;

-- AlterTable
ALTER TABLE `Track` DROP COLUMN `duration`,
    DROP COLUMN `filePath`,
    DROP COLUMN `fileSize`,
    DROP COLUMN `mimeType`,
    ADD COLUMN `audioDuration` INTEGER NULL,
    ADD COLUMN `audioFilePath` VARCHAR(191) NULL,
    ADD COLUMN `audioFileSize` INTEGER NULL,
    ADD COLUMN `audioMimeType` VARCHAR(191) NULL,
    ADD COLUMN `slidePath` VARCHAR(191) NULL,
    ADD COLUMN `slideUrl` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('PENDING', 'PROCESSING', 'COMPLETE') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `videoPath` VARCHAR(191) NULL,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL,
    MODIFY `audioUrl` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Playlist` ADD CONSTRAINT `Playlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Track` ADD CONSTRAINT `Track_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistTrack` ADD CONSTRAINT `PlaylistTrack_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `Playlist`(`playlistId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistTrack` ADD CONSTRAINT `PlaylistTrack_trackId_fkey` FOREIGN KEY (`trackId`) REFERENCES `Track`(`trackId`) ON DELETE CASCADE ON UPDATE CASCADE;
