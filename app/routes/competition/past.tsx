import CompetitionDetailCard from "~/components/Competitions/CompetitionDetailCard/CompetitionDetailCard";
import Footer from "~/components/Footer/Footer";
import NavigationBar from "~/components/NavigationBar/NavigationBar";

export default function PastCompetitions() {
  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <div className="flex max-w-[50%] flex-col">
            <h1 className="mb-8 font-serif text-4xl font-bold">
              Past Competitions
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <CompetitionDetailCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/07/04/17/16/dove-7301617_1280.jpg"
              submissionDeadline={new Date("2020-08-01T00:00:00.000Z")}
            />
            <CompetitionDetailCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/07/04/17/16/dove-7301617_1280.jpg"
              submissionDeadline={new Date("2020-08-01T00:00:00.000Z")}
            />
            <CompetitionDetailCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/07/04/17/16/dove-7301617_1280.jpg"
              submissionDeadline={new Date("2020-08-01T00:00:00.000Z")}
            />
            <CompetitionDetailCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/07/04/17/16/dove-7301617_1280.jpg"
              submissionDeadline={new Date("2020-08-01T00:00:00.000Z")}
            />
            <CompetitionDetailCard
              title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition"
              url=""
              imageUrl="https://cdn.pixabay.com/photo/2022/07/04/17/16/dove-7301617_1280.jpg"
              submissionDeadline={new Date("2020-08-01T00:00:00.000Z")}
            />
            <CompetitionDetailCard
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
