import FeatureSection from "~/components/IndexPage/FeatureSection/FeatureSection";
import Footer from "~/components/Footer/Footer";
import HeroSection from "~/components/HeroSection/HeroSection";
import NavigationBar from "~/components/NavigationBar/NavigationBar";

const heroContent = {
  titleContent: (
    <h1 className="mb-8 font-serif text-6xl">
      Explore Posters, Now in{" "}
      <span className="font-bold">Augmented Reality</span>
    </h1>
  ),
  subtitleText:
    "Experience the poster exhibition like never before, whether you are an organizer, or visitor. Enhance the perception with augmented reality and make the poster literally pop out of a sheet of paper.",
  heroImageUrl: "/images/hero.png",
};

export default function Index() {
  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <HeroSection
          titleContent={heroContent.titleContent}
          subtitleText={heroContent.subtitleText}
          heroImageUrl={heroContent.heroImageUrl}
        />
        <FeatureSection />
      </main>
      <Footer />
    </>
  );
}
