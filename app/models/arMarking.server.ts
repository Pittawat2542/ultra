import type { ARMarking, Poster } from "@prisma/client";

import { prisma } from "~/db.server";

export async function hasARMarkingExisted(posterId: Poster["id"]) {
  const count = await prisma.aRMarking.count({
    where: {
      posterId
    }
  });

  return count > 0;
}

export async function createNewARMarking(data: Omit<ARMarking, "id" | "createdAt" | "updatedAt">) {
  return prisma.aRMarking.create({
    data
  });
}

export async function deleteARMarking(arMarkingId: ARMarking["id"]) {
  return prisma.aRMarking.delete({
    where: {
      id: arMarkingId
    }
  });
}