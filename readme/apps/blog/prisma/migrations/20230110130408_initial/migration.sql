-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "originalAuthorId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "originalPostId" INTEGER NOT NULL DEFAULT 0;
