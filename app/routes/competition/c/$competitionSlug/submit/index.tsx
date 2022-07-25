import { Form, Link, useLoaderData } from "@remix-run/react";

import Button from "~/components/Button/Button";
import Divider from "~/components/Divider/Divider";
import FileUploadInput from "~/components/FileUploadInput/FileUploadInput";
import Footer from "~/components/Footer/Footer";
import type { LoaderArgs } from "@remix-run/node";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import TextArea from "~/components/TextInput/TextArea";
import TextInput from "~/components/TextInput/TextInput";
import TextListInput from "~/components/ListInput/TextListInput";
import { getCompetitionBySlug } from "~/models/competition.server";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { useState } from "react";

export const loader = async ({ params }: LoaderArgs) => {
  const { competitionSlug } = params;

  invariant(competitionSlug, "Competition slug is not found.");

  const competition = await getCompetitionBySlug(competitionSlug);

  if (!competition) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json({ competition });
};

export default function PosterSubmission() {
  //TODO: Submit data to back-end
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
          <Form>
            <FileUploadInput
              id="poster-image"
              labelText="Poster Image"
              isRequired={true}
              type="image"
              callToActionText={"Upload Poster Image File"}
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
              labelText="Abstract"
              id="abstract"
              isRequired={true}
              maxLength={2500}
              value={description}
              setValue={setDescription}
            />
            {competition.teamSubmission === "ENABLED" && (
              <TextListInput
                labelText="Author(s)"
                isRequired={true}
                addNewLabelText="Author"
                maxItems={competition.maxTeamSize ?? 2}
              />
            )}
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
            <Divider className="mt-4 mb-6" />
            <div className="flex justify-end gap-8">
              <Button className="w-1/6">Submit</Button>
              <Link className="w-1/6" to="ar">
                <Button className="w-full">Add AR Poster</Button>
              </Link>
            </div>
          </Form>
        </section>
      </main>
      <Footer />
    </>
  );
}
