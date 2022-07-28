import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { createNewARMarking, deleteARMarking } from "~/models/arMarking.server";
import {
  getPosterByCompetitionIdAndUserId,
  hasPosterSubmitted,
} from "~/models/poster.server";
import {
  json,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import Footer from "~/components/Footer/Footer";
import ImageListInput from "~/components/ListInput/ImageListInput";
import type { MarkingMediaType } from "@prisma/client";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import SectionHeader from "~/components/Competitions/SectionHeader/SectionHeader";
import { getCompetitionBySlug } from "~/models/competition.server";
import invariant from "tiny-invariant";
import { isCompetitionRegistered } from "~/models/registeredCompetitions.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const { competitionSlug } = params;

  invariant(competitionSlug, "Competition slug is not found.");

  const competition = await getCompetitionBySlug(competitionSlug);

  if (!competition) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  if (
    competition.acceptedPosterType !== "IMAGE_AR" ||
    competition.submissionPrivacy === "DISABLED" ||
    new Date(competition.submissionStart!) > new Date() ||
    new Date(competition.submissionEnd!) < new Date()
  ) {
    return redirect(`/competition/c/${competition.slug}`);
  }

  const isRegistered = await isCompetitionRegistered(competition.id, userId);
  const isSubmitted = await hasPosterSubmitted(competition.id, userId);

  if (!isRegistered || !isSubmitted) {
    return redirect(`/competition/c/${competition.slug}`);
  }

  const poster = await getPosterByCompetitionIdAndUserId(
    competition.id,
    userId
  );

  return json({ competition, poster });
};

export const action = async ({ request }: ActionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      directory: "uploads/ar-resources",
      maxPartSize: 3000000,
    }),
    unstable_createMemoryUploadHandler()
  );

  const body = await unstable_parseMultipartFormData(request, uploadHandler);

  const submitButtonActionType = body.get("_action")?.toString();
  invariant(submitButtonActionType, "Submit button action type is not found.");

  if (submitButtonActionType === "delete") {
    const markingId = body.get("marking-id")?.toString();
    invariant(markingId, "Marking id is not found.");

    const deletedMarking = await deleteARMarking(markingId);
    return json({ deletedMarking });
  } else if (submitButtonActionType === "add") {
    const posterId = body.get("poster-id")?.toString();
    invariant(posterId, "Poster id is not found.");

    const markingImage = body.get("marking-image");
    if (markingImage && typeof markingImage === "string") {
      throw new Error("Marking image is not found.");
    }
    const markingImagePath =
      "/uploads/ar-resources/" + (markingImage as File)?.name;

    const associatedMediaType = body
      .get("media-type")
      ?.toString() as MarkingMediaType;
    invariant(associatedMediaType, "Media type is not found.");

    if (associatedMediaType === "IMAGE") {
      const mediaImage = body.get("media-image");
      if (mediaImage && typeof mediaImage === "string") {
        throw new Error("Media image is not found.");
      }
      const mediaImagePath =
        "/uploads/ar-resources/" + (mediaImage as File)?.name;

      const newMarking = await createNewARMarking({
        posterId,
        markingImagePath,
        associatedMediaType,
        associatedMediaPath: mediaImagePath,
      });
      return json({ newMarking });
    } else if (associatedMediaType === "TEXT") {
      const mediaText = body.get("media-text")?.toString();
      invariant(mediaText, "Media text is not found.");

      const newMarking = await createNewARMarking({
        posterId,
        markingImagePath,
        associatedMediaType,
        associatedMediaPath: mediaText,
      });
      return json({ newMarking });
    } else if (associatedMediaType === "THREE_D_MODEL") {
      const mediaModel = body.get("media-model");
      if (mediaModel && typeof mediaModel === "string") {
        throw new Error("Media model is not found.");
      }
      const mediaModelPath =
        "/uploads/ar-resources/" + (mediaModel as File)?.name;

      const newMarking = await createNewARMarking({
        posterId,
        markingImagePath,
        associatedMediaType,
        associatedMediaPath: mediaModelPath,
      });
      return json({ newMarking });
    }
  }
};

export default function ARPosterSubmission() {
  const { competition, poster } = useLoaderData<typeof loader>();
  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <PageHeader
            title="AR Poster Submission"
            subtitle={
              <p className="mt-4 text-xl">
                As a part of{" "}
                <a
                  className="ml-1 font-serif text-2xl font-bold hover:underline"
                  href={`/competition/c/${competition.slug}`}
                >
                  {competition.title}
                </a>
              </p>
            }
          />
          <SectionHeader title={poster?.title ?? ""} className="my-8" />
          <Form method="post" encType="multipart/form-data">
            <ImageListInput
              previousMarkings={poster?.markings ?? []}
              labelText="Marking(s)"
              isRequired={true}
              posterId={poster?.id ?? ""}
            />
          </Form>
        </section>
      </main>
      <Footer />
    </>
  );
}
