/*
  Warnings:

  - You are about to drop the `ComeptitionOrganizer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ComeptitionOrganizer" DROP CONSTRAINT "ComeptitionOrganizer_comeptitionId_fkey";

-- DropForeignKey
ALTER TABLE "ComeptitionOrganizer" DROP CONSTRAINT "ComeptitionOrganizer_organizerId_fkey";

-- DropTable
DROP TABLE "ComeptitionOrganizer";

-- CreateTable
CREATE TABLE "CompetitionOrganizer" (
    "organizerId" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitionOrganizer_pkey" PRIMARY KEY ("organizerId","competitionId")
);

-- AddForeignKey
ALTER TABLE "CompetitionOrganizer" ADD CONSTRAINT "CompetitionOrganizer_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionOrganizer" ADD CONSTRAINT "CompetitionOrganizer_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
