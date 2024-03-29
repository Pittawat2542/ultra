import type { Competition, Poster, User } from "@prisma/client";

import fs from 'fs/promises'
import path from "path";
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
    },
    include: {
      markings: true
    }
  })
}

export async function createNewPoster(posterData: (Omit<Poster, "id" | "compiledARFilePath" | "createdAt" | "updatedAt">)) {
  return prisma.poster.create({
    data: posterData,
  })
}

export async function isSlugExist(posterSlug: Poster["slug"]) {
  const posterCount = await prisma.poster.count({
    where: {
      slug: posterSlug,
    }
  })

  return posterCount === 0
}

export async function getPosterBySlug(slug: Poster["slug"]) {
  return prisma.poster.findUnique({
    where: {
      slug,
    },
    include: {
      competition: true,
    }
  })
}

export async function updateCompiledARFilePath(posterId: Poster["id"], compiledARFilePath: Poster["compiledARFilePath"]) {
  const poster = await prisma.poster.findUnique({
    where: {
      id: posterId,
    }
  });

  if (poster?.compiledARFilePath) {
    const filePath = path.resolve(poster.compiledARFilePath.substring(1));
    await fs.unlink(filePath)
  }

  return prisma.poster.update({
    where: {
      id: posterId,
    },
    data: {
      compiledARFilePath,
    }
  })
}