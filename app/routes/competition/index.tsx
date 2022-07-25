import {
  getCurrentCompetitions,
  getPastCompetitions,
} from "~/models/competition.server";

import CompetitionCard from "~/components/Competitions/CompetitionCard/CompetitionCard";
import Divider from "~/components/Divider/Divider";
import EmptyState from "~/components/EmptyState/EmptyState";
import Footer from "~/components/Footer/Footer";
import HeroSection from "~/components/HeroSection/HeroSection";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import SectionHeader from "~/components/Competitions/SectionHeader/SectionHeader";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const currentCompetitions = await getCurrentCompetitions(true);

  const pastCompetitions = await getPastCompetitions(true);

  return json({ currentCompetitions, pastCompetitions });
};

const heroContent = {
  titleContent: (
    <h1 className="mb-8 font-serif text-6xl font-bold">Competitions</h1>
  ),
  subtitleText:
    "Explore all current competitions, see stunning posters, take a step further to vote your favorites, and why not submit one yourself!?",
  heroImageUrl: "/images/hero-competition.png",
};

export default function CompetitionIndex() {
  const { currentCompetitions, pastCompetitions } =
    useLoaderData<typeof loader>();

  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <HeroSection
          titleContent={heroContent.titleContent}
          subtitleText={heroContent.subtitleText}
          heroImageUrl={heroContent.heroImageUrl}
        />
        <section className="mt-8">
          <SectionHeader
            title="Current Competitions"
            url={currentCompetitions.length === 6 ? "current" : undefined}
          />
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
        <Divider className="my-16" />
        <section>
          <SectionHeader
            title="Past Competitions"
            url={pastCompetitions.length === 6 ? "past" : undefined}
          />
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
