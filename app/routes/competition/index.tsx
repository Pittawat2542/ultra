import CompetitionCard from "~/components/Competitions/CompetitionCard/CompetitionCard";
import Divider from "~/components/Dividier/Divider";
import Footer from "~/components/Footer/Footer";
import HeroSection from "~/components/HeroSection/HeroSection";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import SectionHeader from "~/components/Competitions/SectionHeader/SectionHeader";

const heroContent = {
  titleContent: (
    <h1 className="mb-8 font-serif text-6xl font-bold">Competitions</h1>
  ),
  subtitleText:
    "Explore all current competitions, see stunning posters, take a step further to vote your favorites, and why not submit one yourself!?",
  heroImageUrl: "/images/hero-competition.png",
};

export default function CompetitionIndex() {
  //TODO: Sort data by date descending (newest first) & Only show view all if there is more than 6 competition in each types of competitions
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
          <SectionHeader title="Current Competitions" url="current" />
          <div className="grid grid-cols-3 gap-8">
            <CompetitionCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/06/19/11/07/bird-7271620_1280.jpg"
              submissionDeadline={new Date("2022-08-01T00:00:00.000Z")}
            />
            <CompetitionCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/06/19/11/07/bird-7271620_1280.jpg"
              submissionDeadline={new Date("2022-08-01T00:00:00.000Z")}
            />
            <CompetitionCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/06/19/11/07/bird-7271620_1280.jpg"
              submissionDeadline={new Date("2022-08-01T00:00:00.000Z")}
            />
          </div>
        </section>
        <Divider className="my-16" />
        <section>
          <SectionHeader title="Past Competitions" url="past" />
          <div className="grid grid-cols-3 gap-8">
            <CompetitionCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/07/04/17/16/dove-7301617_1280.jpg"
              submissionDeadline={new Date("2020-08-01T00:00:00.000Z")}
            />
            <CompetitionCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/07/04/17/16/dove-7301617_1280.jpg"
              submissionDeadline={new Date("2020-08-01T00:00:00.000Z")}
            />
            <CompetitionCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/07/04/17/16/dove-7301617_1280.jpg"
              submissionDeadline={new Date("2020-08-01T00:00:00.000Z")}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
