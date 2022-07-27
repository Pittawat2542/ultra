import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  createNewPoster,
  hasPosterSubmitted,
  isSlugExist,
} from "~/models/poster.server";
import {
  json,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { requireUser, requireUserId } from "~/session.server";

import Button from "~/components/Button/Button";
import Divider from "~/components/Divider/Divider";
import FileUploadInput from "~/components/Inputs/FileUploadInput";
import Footer from "~/components/Footer/Footer";
import type { LoaderArgs } from "@remix-run/node";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import ShortUniqueId from "short-unique-id";
import TextArea from "~/components/Inputs/TextArea";
import TextInput from "~/components/Inputs/TextInput";
import { getCompetitionBySlug } from "~/models/competition.server";
import invariant from "tiny-invariant";
import { isCompetitionRegistered } from "~/models/registeredCompetitions.server";
import slugify from "slug";
import { useState } from "react";

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
    competition.submissionPrivacy === "DISABLED" ||
    new Date(competition.submissionStart!) > new Date() ||
    new Date(competition.submissionEnd!) < new Date()
  ) {
    return redirect(`/competition/c/${competition.slug}`);
  }

  const isRegistered = await isCompetitionRegistered(competition.id, userId);
  const isSubmitted = await hasPosterSubmitted(competition.id, userId);

  if (!isRegistered || isSubmitted) {
    return redirect(`/competition/c/${competition.slug}`);
  }

  return json({ competition });
};

export const action = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request);
  const { competitionSlug } = params;

  invariant(competitionSlug, "Competition slug is not found.");

  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      directory: "uploads/pictures",
      maxPartSize: 1000000,
    }),
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const image = formData.get("poster-image");
  if (image && typeof image === "string") {
    return json({});
  }
  const posterImagePath = "/uploads/pictures/" + (image as File)?.name;

  const title = formData.get("title")?.toString();
  invariant(title, "title is required");

  let slug = slugify(title);
  const isSlugAvailable = await isSlugExist(slug);
  if (!isSlugAvailable) {
    slug = `${slug}-${new ShortUniqueId({ length: 6 })()}`;
  }

  const description = formData.get("description")?.toString();
  invariant(description, "description is required");

  const posterUrl = formData?.get("poster-url")?.toString() ?? null;
  const videoUrl = formData?.get("video-url")?.toString() ?? null;

  const competitionId = formData.get("competition-id")!.toString();
  const competitionPosterType = formData
    .get("competition-poster-type")!
    .toString();

  const _action = formData.get("_action")?.toString();
  const poster = await createNewPoster({
    title,
    slug,
    authors: [`${user.firstName} ${user.lastName}`],
    description,
    posterUrl,
    userId: user.id,
    videoUrl,
    competitionId: competitionId,
    hasAREnabled: competitionPosterType === "IMAGE_AR",
    posterImagePath,
  });

  return redirect(
    _action === "submit"
      ? `/competition/c/${competitionSlug}/p/${poster.slug}`
      : `/competition/c/${competitionSlug}/submit/ar`
  );
};

export default function PosterSubmission() {
  const { competition } = useLoaderData<typeof loader>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <PageHeader
            title="Poster Submission"
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
          <Form method="post" encType="multipart/form-data">
            <FileUploadInput
              id="poster-image"
              labelText="Poster Image"
              isRequired={true}
              type="image"
            />
            <TextInput
              labelText="Title"
              id="title"
              isRequired={true}
              maxLength={250}
              value={title}
              setValue={setTitle}
            />
            <TextArea
              labelText="Description"
              id="description"
              isRequired={true}
              maxLength={2500}
              value={description}
              setValue={setDescription}
            />
            <TextInput
              labelText="URL Link to Original Poster File"
              id="poster-url"
              value={posterUrl}
              setValue={setPosterUrl}
            />
            <TextInput
              labelText="URL Link to Video Presentation"
              id="video-url"
              value={videoUrl}
              setValue={setVideoUrl}
            />
            <input type="hidden" name="competition-id" value={competition.id} />
            <input
              type="hidden"
              name="competition-poster-type"
              value={competition.acceptedPosterType}
            />
            <Divider className="mt-4 mb-6" />
            <div className="flex justify-end gap-8">
              <Button
                id="_action"
                className="w-1/6"
                value="submit"
                type="submit"
              >
                Submit
              </Button>
              {competition.acceptedPosterType === "IMAGE_AR" && (
                <Button
                  id="_action"
                  className="w-1/6"
                  value="submit_ar}"
                  type="submit"
                >
                  Add AR Poster
                </Button>
              )}
            </div>
          </Form>
        </section>
      </main>
      <Footer />
    </>
  );
}
