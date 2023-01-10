-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likeUserIds" TEXT[],
ALTER COLUMN "originalAuthorId" DROP DEFAULT;
