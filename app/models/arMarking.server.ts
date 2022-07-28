import type { ARMarking, Poster } from "@prisma/client";

import fs from 'fs/promises'
import path from "path";
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
  const deletedMarking = await prisma.aRMarking.delete({
    where: {
      id: arMarkingId
    }
  });
  const filePath = path.resolve(deletedMarking.markingImagePath.substring(1));
  await fs.unlink(filePath)
  if (deletedMarking.associatedMediaType !== 'TEXT') {
    const fPath = path.resolve(deletedMarking.associatedMediaPath.substring(1));
    await fs.unlink(fPath)
  }

  return deletedMarking;
}

export async function getAllMarkingTargetImagePaths(posterId: Poster["id"]) {
  return prisma.aRMarking.findMany({
    where: {
      posterId
    },
    select: {
      markingImagePath: true
    }
  });
}

export async function getAllMarkingsByPosterId(posterId: Poster["id"]) {
  return prisma.aRMarking.findMany({
    where: {
      posterId
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
}