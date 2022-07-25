import { prisma } from "~/db.server";

export async function createNewCompetitionOrganizer(competitionId: string, userId: string) {
  return prisma.competitionOrganizer.create({
    data: {
      competitionId: competitionId,
      organizerId: userId,
    }
  })
}