/*
  Warnings:

  - You are about to drop the `PosterSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ARMarking" DROP CONSTRAINT "ARMarking_posterId_fkey";

-- DropForeignKey
ALTER TABLE "PosterSubmission" DROP CONSTRAINT "PosterSubmission_competitionId_fkey";

-- DropForeignKey
ALTER TABLE "PosterSubmission" DROP CONSTRAINT "PosterSubmission_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_posterSubmissionId_fkey";

-- DropTable
DROP TABLE "PosterSubmission";

-- CreateTable
CREATE TABLE "Poster" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "posterImagePath" TEXT NOT NULL,
    "posterUrl" TEXT,
    "videoUrl" TEXT,
    "authors" TEXT[],
    "competitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hasAREnabled" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Poster_slug_key" ON "Poster"("slug");

-- AddForeignKey
ALTER TABLE "Poster" ADD CONSTRAINT "Poster_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poster" ADD CONSTRAINT "Poster_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ARMarking" ADD CONSTRAINT "ARMarking_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Poster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_posterSubmissionId_fkey" FOREIGN KEY ("posterSubmissionId") REFERENCES "Poster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
