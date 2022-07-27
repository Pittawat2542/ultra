import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  ExternalLinkIcon,
  LinkIcon,
  UserIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import { createNewVote, hasVoted as hasUserVoted } from "~/models/vote.server";

import Button from "~/components/Button/Button";
import Divider from "~/components/Divider/Divider";
import Footer from "~/components/Footer/Footer";
import Modal from "~/components/Modal/Modal";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import Range from "~/components/Inputs/Range";
import { formatNames } from "~/utils/string";
import { getPosterBySlug } from "~/models/poster.server";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { useModal } from "~/hooks/useModal";
import { useState } from "react";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { posterSlug } = params;
  const userId = await requireUserId(request);

  invariant(posterSlug, "Poster slug is not found.");

  const poster = await getPosterBySlug(posterSlug);

  if (!poster) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const hasVoted = await hasUserVoted(userId, poster.id);

  return json({ poster, userId, hasVoted });
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const competitionId = formData.get("competitionId")?.toString();
  invariant(competitionId, "Competition id is not found.");
  const posterId = formData.get("posterId")?.toString();
  invariant(posterId, "Poster id is not found.");
  const votingScore = formData.get("votingScore")?.toString();
  invariant(votingScore, "Voting score is not found.");

  await createNewVote({
    userId,
    posterId,
    competitionId,
    score: Number.parseInt(votingScore),
  });

  return json({});
};

export default function PosterDetail() {
  const submit = useSubmit();
  const { closeModal, isOpen, openModal } = useModal();
  const { poster, hasVoted } = useLoaderData<typeof loader>();
  const [votingScore, setVotingScore] = useState("5");

  const onVoting = () => {
    closeModal();
    const data = new FormData();
    data.append("competitionId", poster.competition.id);
    data.append("posterId", poster.id);
    data.append("votingScore", votingScore);
    submit(data, {
      method: "post",
    });
  };

  return (
    <>
      <NavigationBar />
      <main className="mt-8 px-32">
        <section className="mt-8">
          <PageHeader
            title={poster.title}
            subtitle={
              <p className="mt-4 text-xl">
                As a part of{" "}
                <a
                  className="ml-1 font-serif text-2xl font-bold hover:underline"
                  href={`/competition/c/${poster.competition.slug}`}
                >
                  {poster.competition.title}
                </a>
              </p>
            }
          />
          <img
            className="mt-16 mb-8 max-h-[750px] w-full rounded-xl object-cover transition group-hover:opacity-70"
            src={poster.posterImagePath}
            alt="poster cover"
          />
          <div className="flex justify-between">
            <div className="flex-7 flex flex-col">
              <p className="mb-3 text-xl">
                <UserIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
                <span className="mr-4 font-bold">Authors</span>
                {formatNames(poster.authors)}
              </p>
              {poster.posterUrl && (
                <p className="mb-3 text-xl">
                  <LinkIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
                  <span className="mr-4 font-bold">Poster</span>
                  <span className="hover:underline">
                    <a href={poster.posterUrl}>
                      {poster.posterUrl}
                      <ExternalLinkIcon className="ml-2 -mt-1 inline-block h-4 w-4" />
                    </a>
                  </span>
                </p>
              )}
              {poster.videoUrl && (
                <p className="mb-3 text-xl">
                  <VideoCameraIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
                  <span className="mr-4 font-bold">Video</span>
                  <span className="hover:underline">
                    <a href={poster.videoUrl}>
                      {poster.videoUrl}
                      <ExternalLinkIcon className="ml-2 -mt-1 inline-block h-4 w-4" />
                    </a>
                  </span>
                </p>
              )}
            </div>
            <div className="flex max-w-[30%] flex-1 flex-col justify-between">
              {poster.hasAREnabled && (
                <Link className="mb-4 w-full" to={`ar`}>
                  <Button className="w-full">AR Experience</Button>
                </Link>
              )}
              {poster.competition.votingPrivacy !== "DISABLED" &&
                !hasVoted &&
                new Date(poster.competition.submissionStart!) <= new Date() &&
                new Date(poster.competition.submissionEnd!) >= new Date() && (
                  <Button className="w-full" onClick={openModal}>
                    Vote
                  </Button>
                )}
            </div>
          </div>
        </section>
        <Divider className="my-8" />
        <section className="text-lg">
          {poster.description.split("\n").map((line, index) => (
            <p key={`line-${index}`} className="mb-2">
              {line}
            </p>
          ))}
        </section>
      </main>
      <Footer />
      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        title={`Please Give a Score`}
        subtitleContent={
          <h3 className="mt-4">
            for <span className="text-lg font-bold">{poster.title}</span>
          </h3>
        }
        bodyContent={
          <Range
            id="voting-score"
            value={votingScore}
            setValue={(e) => {
              setVotingScore(e.target.value);
            }}
          />
        }
        confirmButtonText="Confirm"
        onCancelButtonClick={closeModal}
        onConfirmButtonClick={onVoting}
      />
    </>
  );
}
