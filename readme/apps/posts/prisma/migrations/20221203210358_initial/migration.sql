-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "datePublication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL,
    "isRepost" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "tags" TEXT[],
    "title" TEXT NOT NULL,
    "urlVideo" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "postText" TEXT NOT NULL,
    "quoteText" TEXT NOT NULL,
    "quoteAuthor" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
