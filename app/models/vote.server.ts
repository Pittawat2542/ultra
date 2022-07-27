import type { Poster, User, Vote } from "@prisma/client";

import { prisma } from "~/db.server";

export async function createNewVote(data: (Omit<Vote, "createdAt" | "updatedAt">)) {
  return prisma.vote.create({
    data,
  });
}

export async function hasVoted(userId: User["id"], posterId: Poster["id"]) {
  const count = await prisma.vote.count({
    where: {
      userId,
      posterId
    }
  })

  return count === 1;
}