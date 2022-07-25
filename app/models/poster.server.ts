import type { Competition, User } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getPostersByCompetitionId(competitionId: Competition["id"]) {
  return prisma.poster.findMany({
    where: {
      competitionId: competitionId,
    },
  });
}

export async function hasPosterSubmitted(competitionId: Competition["id"], userId: User["id"]) {
  const count = await prisma.poster.count({
    where: {
      competitionId: competitionId,
      userId: userId,
    }
  })

  return count === 1;
}

export async function getPosterByCompetitionIdAndUserId(competitionId: Competition["id"], userId: User["id"]) {
  return prisma.poster.findFirst({
    where: {
      competitionId: competitionId,
      userId: userId,
    }
  })
}