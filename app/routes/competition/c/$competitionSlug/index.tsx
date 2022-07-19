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

import Button from "~/components/Button/Button";
import Divider from "~/components/Divider/Divider";
import Footer from "~/components/Footer/Footer";
import { Link, useLoaderData } from "@remix-run/react";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import PosterCard from "~/components/Competitions/PosterCard/PosterCard";
import { formatDateTimeString } from "~/utils/time";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db.server";
import type { Competition, Poster } from "@prisma/client";
import { DEFAULT_COVER_IMAGE } from "~/constants/images";
import EmptyState from "~/components/EmptyState/EmptyState";

type LoaderData = {
  competition: Competition;
  posters: Poster[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { competitionSlug } = params;
  const competition = await prisma.competition.findUnique({
    where: {
      slug: competitionSlug,
    },
  });

  if (!competition) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const posters = await prisma.poster.findMany({
    where: {
      competitionId: competition.id,
    },
  });

  return json<LoaderData>({ competition, posters });
};

export default function CompetitionDetailIndex() {
  const { competition, posters } = useLoaderData<LoaderData>();
  let hasRankAnnounced = false;

  if (competition.votingPrivacy !== "DISABLED") {
    hasRankAnnounced = competition.rankAnnouncementDate! >= new Date();
  }

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
                className="rounded-xl object-contain transition group-hover:opacity-70"
                src={competition.coverImagePath ?? DEFAULT_COVER_IMAGE}
                alt={`${competition.title} cover`}
              />
              <div className="mt-6 flex w-full justify-between gap-4">
                <Link className="block w-full" to="ar">
                  <Button className="w-full">AR Experience</Button>
                </Link>
                <Link className="block w-full" to="submit">
                  <Button className="w-full">Register</Button>
                </Link>
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
                competition.submissionStart!
              )} - ${formatDateTimeString(competition.submissionEnd!)}`}
            </p>
          )}
          {competition.votingPrivacy !== "DISABLED" && (
            <>
              <p className="mb-3 text-xl">
                <StarIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
                <span className="mr-4 font-bold">Voting</span>
                {`${formatDateTimeString(
                  competition.votingStart!
                )} - ${formatDateTimeString(competition.votingEnd!)}`}
              </p>
              <p className="mb-3 text-xl">
                <ChartBarIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
                <span className="mr-4 font-bold">Rank Announcement</span>
                {formatDateTimeString(competition.rankAnnouncementDate!)}
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
          {posters.length === 0 ? (
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
              {posters.map((poster) => (
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
    </>
  );
}
