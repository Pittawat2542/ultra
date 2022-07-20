import {
  getNumberOfPastCompetitions,
  getPastCompetitions,
} from "~/models/competition.server";

import type { Competition } from "@prisma/client";
import CompetitionCard from "~/components/Competitions/CompetitionCard/CompetitionCard";
import EmptyState from "~/components/EmptyState/EmptyState";
import Footer from "~/components/Footer/Footer";
import type { LoaderArgs } from "@remix-run/node";
import { NUMBER_OF_ITEMS_PER_PAGE } from "~/constants/pagination";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import Pagination from "~/components/Pagination/Pagination";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type LoaderData = {
  pastCompetitions: Array<Competition>;
  pastCompetitionCount: number;
  currentPage: number;
  totalPage: number;
};

export const loader = async ({ params }: LoaderArgs) => {
  const { page } = params;

  invariant(page, "Page must be specified.");

  const pastCompetitionCount = await getNumberOfPastCompetitions();

  const pastCompetitions = await getPastCompetitions(
    false,
    Number.parseInt(page)
  );

  return json<LoaderData>({
    pastCompetitions,
    pastCompetitionCount,
    currentPage: Number.parseInt(page),
    totalPage: Math.ceil(pastCompetitionCount / NUMBER_OF_ITEMS_PER_PAGE),
  });
};

export default function PastCompetitions() {
  const { pastCompetitions, pastCompetitionCount, currentPage, totalPage } =
    useLoaderData<LoaderData>();

  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <div className="mb-16 flex max-w-[50%] flex-col">
            <PageHeader title="Past Competition" />
          </div>
          {pastCompetitionCount === 0 ? (
            <EmptyState
              iconContent={<QuestionMarkCircleIcon className="h-20 w-20" />}
              text="There is no past competitions currently available."
            />
          ) : (
            <>
              <div className="grid grid-cols-3 gap-8">
                {pastCompetitions.map((competition) => (
                  <CompetitionCard
                    key={competition.id}
                    title={competition.title}
                    url={`c/${competition.slug}`}
                    imageUrl={competition.coverImagePath}
                    submissionDeadline={competition.submissionEnd!}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                totalItems={pastCompetitionCount}
                baseUrl="/competition/past"
              />
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
