/*
  Warnings:

  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `posterSubmissionId` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `posterId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_posterSubmissionId_fkey";

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
DROP COLUMN "posterSubmissionId",
ADD COLUMN     "posterId" TEXT NOT NULL,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("userId", "posterId", "competitionId");

-- CreateTable
CREATE TABLE "RegisteredCompetition" (
    "userId" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegisteredCompetition_pkey" PRIMARY KEY ("userId","competitionId")
);

-- AddForeignKey
ALTER TABLE "RegisteredCompetition" ADD CONSTRAINT "RegisteredCompetition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredCompetition" ADD CONSTRAINT "RegisteredCompetition_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Poster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
