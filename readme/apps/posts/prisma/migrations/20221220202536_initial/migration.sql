/*
  Warnings:

  - Changed the type of `state` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostState" AS ENUM ('draft', 'published');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "state",
ADD COLUMN     "state" "PostState" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "PostType" NOT NULL;
