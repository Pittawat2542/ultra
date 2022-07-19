import type { Competition } from "@prisma/client";
import CompetitionCard from "~/components/Competitions/CompetitionCard/CompetitionCard";
import EmptyState from "~/components/EmptyState/EmptyState";
import Footer from "~/components/Footer/Footer";
import type { LoaderFunction } from "@remix-run/node";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { useLoaderData } from "@remix-run/react";

type LoaderData = {
  currentCompetitions: Array<Competition>;
};

export const loader: LoaderFunction = async () => {
  const currentCompetitions = await prisma.competition.findMany({
    where: {
      viewingPrivacy: "PUBLIC",
      submissionPrivacy: "PUBLIC",
      submissionEnd: {
        gte: new Date(),
      },
    },
    take: 6,
    orderBy: {
      submissionEnd: "desc",
    },
  });

  return json<LoaderData>({ currentCompetitions });
};

export default function CurrentCompetitions() {
  const { currentCompetitions } = useLoaderData<LoaderData>();

  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <div className="flex max-w-[50%] flex-col mb-16">
            <PageHeader title="Current Competition" />
          </div>
          {currentCompetitions.length === 0 ? (
            <EmptyState
              iconContent={<QuestionMarkCircleIcon className="h-20 w-20" />}
              text="There is no current competitions currently available."
            />
          ) : (
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
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
