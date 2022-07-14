import CompetitionCard from "~/components/Competitions/CompetitionCard/CompetitionCard";
import Footer from "~/components/Footer/Footer";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";

export default function PastCompetitions() {
  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <div className="flex max-w-[50%] flex-col">
          <PageHeader title="Past Competition" />
          </div>
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
