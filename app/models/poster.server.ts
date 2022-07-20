import type { Competition } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getPostersByCompetitionId(competitionId: Competition["id"]) {
  return prisma.poster.findMany({
    where: {
      competitionId: competitionId,
    },
  });
}