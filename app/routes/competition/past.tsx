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
  pastCompetitions: Array<Competition>;
};

export const loader: LoaderFunction = async () => {
  const pastCompetitions = await prisma.competition.findMany({
    where: {
      viewingPrivacy: "PUBLIC",
      submissionPrivacy: "PUBLIC",
      submissionEnd: {
        lt: new Date(),
      },
    },
    take: 6,
    orderBy: {
      submissionEnd: "desc",
    },
  });

  return json<LoaderData>({ pastCompetitions });
};

export default function PastCompetitions() {
  const { pastCompetitions } = useLoaderData<LoaderData>();
  
  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <div className="mb-16 flex max-w-[50%] flex-col">
            <PageHeader title="Past Competition" />
          </div>
          {pastCompetitions.length === 0 ? (
            <EmptyState
              iconContent={<QuestionMarkCircleIcon className="h-20 w-20" />}
              text="There is no past competitions currently available."
            />
          ) : (
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
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
