import type { Competition, User } from "@prisma/client";

import { prisma } from "~/db.server";

export async function isCompetitionRegistered(competitionId: Competition["id"], userId: User["id"]) {
  const count = await prisma.registeredCompetition.count({
    where: {
      competitionId: competitionId,
      userId: userId
    },
  })
  return count === 1;
}

export async function registerCompetition(competitionId: Competition["id"], userId: User["id"]) {
  return prisma.registeredCompetition.create({
    data: {
      competitionId: competitionId,
      userId: userId
    }
  })
}