import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  ChartBarIcon,
  ClockIcon,
  GlobeIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import {
  isCompetitionRegistered,
  registerCompetition,
} from "~/models/registeredCompetitions.server";

import Button from "~/components/Button/Button";
import { DEFAULT_COVER_IMAGE } from "~/constants/images";
import Divider from "~/components/Divider/Divider";
import EmptyState from "~/components/EmptyState/EmptyState";
import Footer from "~/components/Footer/Footer";
import Modal from "~/components/Modal/Modal";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import PosterCard from "~/components/Competitions/PosterCard/PosterCard";
import { SubmissionPrivacy } from "@prisma/client";
import { formatDateTimeString } from "~/utils/time";
import { getCompetitionBySlug } from "~/models/competition.server";
import { getPosterByCompetitionIdAndUserId } from "~/models/poster.server";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { useModal } from "~/hooks/useModal";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);

  const { competitionSlug } = params;

  invariant(competitionSlug, "Competition slug is not found.");

  const competition = await getCompetitionBySlug(competitionSlug, true);

  if (!competition) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const isRegistered = await isCompetitionRegistered(competition.id, userId);
  const poster = await getPosterByCompetitionIdAndUserId(
    competition.id,
    userId
  );

  return json({ competition, isRegistered, poster });
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const competitionId = formData.get("competitionId");
  invariant(competitionId, "Competition id is not found.");

  await registerCompetition(competitionId.toString(), userId);
  return json({});
};

export default function CompetitionDetailIndex() {
  const submit = useSubmit();
  const { closeModal, isOpen, openModal } = useModal();
  const { competition, isRegistered, poster } = useLoaderData<typeof loader>();
  let hasRankAnnounced = false;
  let hasSubmissionOpen = false;
  let hasVotingOpen = false;

  if (competition.submissionPrivacy !== SubmissionPrivacy.DISABLED) {
    hasSubmissionOpen =
      new Date(competition.submissionStart!) <= new Date() &&
      new Date(competition.submissionEnd!) >= new Date();
  }

  if (competition.votingPrivacy !== "DISABLED") {
    hasVotingOpen =
      new Date(competition.votingStart!) <= new Date() &&
      new Date(competition.votingEnd!) >= new Date();
    hasRankAnnounced =
      new Date(competition.rankAnnouncementDate!) >= new Date();
  }

  const onRegisterCompetition = () => {
    closeModal();
    const data = new FormData();
    data.append("competitionId", competition.id);
    submit(data, {
      method: "post",
    });
  };

  //TODO: Define rank calculation logic and supply to the required components

  return (
    <>
      <NavigationBar />
      <main className="mt-8 px-32">
        <section>
          <div className="flex items-center justify-between gap-16">
            <PageHeader title={competition.title} />
            <div className="flex flex-1 flex-col items-center">
              <img
                className="max-h-[450px] w-full rounded-xl object-cover transition group-hover:opacity-70"
                src={competition.coverImagePath ?? DEFAULT_COVER_IMAGE}
                alt={`${competition.title} cover`}
              />
              <div className="mt-6 flex w-full justify-between gap-4">
                <Link className="block w-full" to="ar">
                  <Button className="w-full">Explore AR</Button>
                </Link>
                {!isRegistered && (
                  <Button className="block w-full" onClick={openModal}>
                    Register
                  </Button>
                )}
                {isRegistered && !poster && hasSubmissionOpen && (
                  <Link className="block w-full" to="submit">
                    <Button className="w-full">Submit Poster</Button>
                  </Link>
                )}
                {isRegistered && !!poster && (
                  <Link className="block w-full" to={`p/${poster.slug}`}>
                    <Button className="w-full">View Submission</Button>
                  </Link>
                )}
                {hasVotingOpen && <Button className="w-full">Vote</Button>}
              </div>
            </div>
          </div>
        </section>
        <section className="mt-8">
          <h1 className="mb-4 font-serif text-3xl font-bold">Schedule</h1>
          {competition.submissionPrivacy !== "DISABLED" && (
            <p className="mb-3 text-xl">
              <ClockIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
              <span className="mr-4 font-bold">Submission</span>
              {`${formatDateTimeString(
                new Date(competition.submissionStart!)
              )} - ${formatDateTimeString(
                new Date(competition.submissionEnd!)
              )}`}
            </p>
          )}
          {competition.votingPrivacy !== "DISABLED" && (
            <>
              <p className="mb-3 text-xl">
                <StarIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
                <span className="mr-4 font-bold">Voting</span>
                {`${formatDateTimeString(
                  new Date(competition.votingStart!)
                )} - ${formatDateTimeString(new Date(competition.votingEnd!))}`}
              </p>
              <p className="mb-3 text-xl">
                <ChartBarIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
                <span className="mr-4 font-bold">Rank Announcement</span>
                {formatDateTimeString(
                  new Date(competition.rankAnnouncementDate!)
                )}
              </p>
            </>
          )}
        </section>
        <Divider className="mt-6 mb-4" />
        <section className="flex justify-between gap-4">
          {competition.viewingPrivacy === "PUBLIC" && (
            <p className="mb-3 text-xl">
              <GlobeIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
              <span className="mr-4 font-bold">Anyone Can View</span>
            </p>
          )}
          {competition.viewingPrivacy === "LIMITED" && (
            <p className="mb-3 text-xl">
              <LockClosedIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
              <span className="mr-4 font-bold">Limited Visibility</span>
            </p>
          )}

          {competition.submissionPrivacy === "PUBLIC" && (
            <p className="mb-3 text-xl">
              <GlobeIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
              <span className="mr-4 font-bold">Anyone Can Submit</span>
            </p>
          )}
          {competition.submissionPrivacy === "LIMITED" && (
            <p className="mb-3 text-xl">
              <LockClosedIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
              <span className="mr-4 font-bold">Limited Submission</span>
            </p>
          )}

          {competition.votingPrivacy === "PUBLIC" && (
            <p className="mb-3 text-xl">
              <GlobeIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
              <span className="mr-4 font-bold">Anyone Can Vote</span>
            </p>
          )}
          {competition.votingPrivacy === "LIMITED" && (
            <p className="mb-3 text-xl">
              <LockClosedIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
              <span className="mr-4 font-bold">Limited Voting</span>
            </p>
          )}

          {competition.teamSubmission === "ENABLED" && (
            <p className="mb-3 text-xl">
              <UserGroupIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
              <span className="mr-4 font-bold">Allow Team Submission</span>
            </p>
          )}
          {competition.teamSubmission === "ENABLED" && competition.maxTeamSize && (
            <p className="mb-3 text-xl">
              <UserGroupIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
              <span className="mr-4 font-bold">
                1 - {competition.maxTeamSize} Team Members
              </span>
            </p>
          )}

          {competition.submissionPolicy === "REQUIRE_APPROVAL" && (
            <p className="mb-3 text-xl">
              <SearchIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
              <span className="mr-4 font-bold">
                Submission Require Approval
              </span>
            </p>
          )}
        </section>
        <Divider className="mt-2 mb-16" />
        <section className="text-lg">
          {competition.description.split("\n").map((text, index) => (
            <p key={index} className="mb-2">
              {text}
            </p>
          ))}
        </section>
        <section className="mt-16">
          <h2 className="mb-8 font-serif text-4xl font-bold leading-10">
            {hasRankAnnounced ? "Ranking" : "Posters"}
          </h2>
          {competition.posters.length === 0 ? (
            <EmptyState
              iconContent={<QuestionMarkCircleIcon className="h-20 w-20" />}
              text="There is no poster submitted to this competition."
            />
          ) : (
            <div
              className={`grid ${
                hasRankAnnounced ? "grid-cols-1" : "grid-cols-3"
              } gap-8`}
            >
              {competition.posters.map((poster) => (
                <PosterCard
                  key={poster.id}
                  title={poster.title}
                  url={`p/${poster.slug}`}
                  imageUrl={poster.posterImagePath}
                  authors={poster.authors}
                  rank={hasRankAnnounced ? 1 : undefined}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        title="Do you want to register for this competition?"
        confirmButtonText="Confirm"
        onCancelButtonClick={closeModal}
        onConfirmButtonClick={onRegisterCompetition}
      />
    </>
  );
}
