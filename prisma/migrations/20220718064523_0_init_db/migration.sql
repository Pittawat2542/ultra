-- CreateEnum
CREATE TYPE "ViewingPrivacy" AS ENUM ('DISABLED', 'PUBLIC', 'LIMITED');

-- CreateEnum
CREATE TYPE "SubmissionPrivacy" AS ENUM ('DISABLED', 'PUBLIC', 'LIMITED');

-- CreateEnum
CREATE TYPE "SubmissionPolicy" AS ENUM ('NONE', 'REQUIRE_APPROVAL');

-- CreateEnum
CREATE TYPE "VotingPrivacy" AS ENUM ('DISABLED', 'PUBLIC', 'LIMITED');

-- CreateEnum
CREATE TYPE "AcceptedPosterType" AS ENUM ('IMAGE', 'IMAGE_AR');

-- CreateEnum
CREATE TYPE "TeamSubmission" AS ENUM ('DISABLED', 'ENABLED');

-- CreateEnum
CREATE TYPE "MarkingMediaType" AS ENUM ('IMAGE', 'TEXT', 'THREE_D_MODEL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImagePath" TEXT,
    "viewingPrivacy" "ViewingPrivacy" NOT NULL,
    "submissionPrivacy" "SubmissionPrivacy" NOT NULL,
    "submissionPolicy" "SubmissionPolicy" NOT NULL,
    "votingPrivacy" "VotingPrivacy" NOT NULL,
    "acceptedPosterType" "AcceptedPosterType" NOT NULL,
    "teamSubmission" "TeamSubmission" NOT NULL,
    "maxNumPoster" INTEGER,
    "maxTeamSize" INTEGER,
    "viewingCode" TEXT,
    "submissionCode" TEXT,
    "votingCode" TEXT,
    "submissionStart" TIMESTAMP(3),
    "submissionEnd" TIMESTAMP(3),
    "votingStart" TIMESTAMP(3),
    "votingEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComeptitionOrganizer" (
    "organizerId" TEXT NOT NULL,
    "comeptitionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComeptitionOrganizer_pkey" PRIMARY KEY ("organizerId","comeptitionId")
);

-- CreateTable
CREATE TABLE "PosterSubmission" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "posterUrl" TEXT,
    "videoUrl" TEXT,
    "authors" TEXT[],
    "competitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hasAREnabled" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PosterSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ARMarking" (
    "id" TEXT NOT NULL,
    "markingImagePath" TEXT NOT NULL,
    "associatedMediaType" "MarkingMediaType" NOT NULL,
    "associatedMediaPath" TEXT NOT NULL,
    "posterId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ARMarking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "userId" TEXT NOT NULL,
    "posterSubmissionId" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("userId","posterSubmissionId","competitionId")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_slug_key" ON "Competition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PosterSubmission_slug_key" ON "PosterSubmission"("slug");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComeptitionOrganizer" ADD CONSTRAINT "ComeptitionOrganizer_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComeptitionOrganizer" ADD CONSTRAINT "ComeptitionOrganizer_comeptitionId_fkey" FOREIGN KEY ("comeptitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PosterSubmission" ADD CONSTRAINT "PosterSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PosterSubmission" ADD CONSTRAINT "PosterSubmission_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ARMarking" ADD CONSTRAINT "ARMarking_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "PosterSubmission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_posterSubmissionId_fkey" FOREIGN KEY ("posterSubmissionId") REFERENCES "PosterSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
