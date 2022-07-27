import type { LoaderArgs } from "@remix-run/node";
import fs from "fs";
import invariant from "tiny-invariant";
import { nodeStreamToReadableStream } from "~/utils/file.server";
import path from "path";

export const loader = async ({ params }: LoaderArgs) => {
  const { fileName } = params;

  invariant(fileName, "fileName is required");

  const filePath = path.resolve("uploads", "pictures", fileName);
  const fileExtension = filePath.split(".").pop();
  const isJpg = fileExtension === "jpg" || fileExtension === "jpeg";
  const isPng = fileExtension === "png";
  const isGif = fileExtension === "gif";

  try {
    const file = fs.createReadStream(filePath);

    return new Response(nodeStreamToReadableStream(file), {
      status: 200,
      headers: {
        "Content-Type": isJpg
          ? "images/jpeg"
          : isPng
          ? "images/png"
          : isGif
          ? "images/gif"
          : "",
      },
    });
  } catch (_) {
    return new Response("File is not found", { status: 404 });
  }
};
