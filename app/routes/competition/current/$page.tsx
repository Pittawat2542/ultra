import {
  getCurrentCompetitions,
  getNumberOfCurrentCompetitions,
} from "~/models/competition.server";

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

export const loader = async ({ params }: LoaderArgs) => {
  const { page } = params;

  invariant(page, "Page must be specified.");

  const currentCompetitions = await getCurrentCompetitions(
    false,
    Number.parseInt(page)
  );

  const currentCompetitionCount = await getNumberOfCurrentCompetitions();

  return json({
    currentCompetitions,
    currentCompetitionCount,
    currentPage: Number.parseInt(page),
    totalPage: Math.ceil(currentCompetitionCount / NUMBER_OF_ITEMS_PER_PAGE),
  });
};

export default function CurrentCompetitions() {
  const {
    currentCompetitions,
    currentCompetitionCount,
    currentPage,
    totalPage,
  } = useLoaderData<typeof loader>();

  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <div className="mb-16 flex max-w-[50%] flex-col">
            <PageHeader title="Current Competition" />
          </div>
          {currentCompetitionCount === 0 ? (
            <EmptyState
              iconContent={<QuestionMarkCircleIcon className="h-20 w-20" />}
              text="There is no current competitions currently available."
            />
          ) : (
            <>
              <div className="grid grid-cols-3 gap-8">
                {currentCompetitions.map((competition) => (
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
                totalItems={currentCompetitionCount}
                baseUrl="/competition/current"
              />
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
