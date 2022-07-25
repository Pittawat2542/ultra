import type { Competition, User } from "@prisma/client";

import { NUMBER_OF_ITEMS_PER_PAGE } from "~/constants/pagination";
import { createNewCompetitionOrganizer } from "./competitionOrganizers.server";
import { getUserById } from "./user.server";
import { prisma } from "~/db.server";

export async function getCompetitionBySlug(slug: Competition["slug"], isPostersIncluded = false) {
  return prisma.competition.findUnique({
    where: { slug }, include: {
      posters: isPostersIncluded
    }
  });
}

export async function getCurrentCompetitions(featured = false, page = 1) {
  return prisma.competition.findMany({
    where: {
      viewingPrivacy: "PUBLIC",
      submissionPrivacy: "PUBLIC",
      submissionEnd: {
        gte: new Date(),
      },
    },
    take: featured ? 6 : NUMBER_OF_ITEMS_PER_PAGE,
    skip: (page - 1) * NUMBER_OF_ITEMS_PER_PAGE,
    orderBy: {
      submissionEnd: "desc",
    },
  });
}

export async function getNumberOfCurrentCompetitions() {
  return prisma.competition.count({
    where: {
      viewingPrivacy: "PUBLIC",
      submissionPrivacy: "PUBLIC",
      submissionEnd: {
        gte: new Date(),
      },
    },
  });
}

export async function getPastCompetitions(featured = false, page = 1) {
  return prisma.competition.findMany({
    where: {
      viewingPrivacy: "PUBLIC",
      submissionPrivacy: "PUBLIC",
      submissionEnd: {
        lt: new Date(),
      },
    },
    take: featured ? 6 : NUMBER_OF_ITEMS_PER_PAGE,
    skip: (page - 1) * NUMBER_OF_ITEMS_PER_PAGE,
    orderBy: {
      submissionEnd: "desc",
    },
  });
}

export async function getNumberOfPastCompetitions() {
  return prisma.competition.count({
    where: {
      viewingPrivacy: "PUBLIC",
      submissionPrivacy: "PUBLIC",
      submissionEnd: {
        lt: new Date(),
      },
    },
  });
}

export async function createNewCompetition(competitionData: (Omit<Competition, "id" | "createdAt" | "updatedAt"> & { userId: string })) {
  const { userId, ...data } = competitionData
  const competition = await prisma.competition.create({
    data,
  })

  createNewCompetitionOrganizer(competition.id, userId);

  return competition;
}

export async function checkSlugExist(competitionSlug: Competition["slug"]) {
  const competitionCount = await prisma.competition.count({
    where: {
      slug: competitionSlug,
    }
  })

  return competitionCount === 0
}