import FeatureSection from "~/components/IndexPage/FeatureSection/FeatureSection";
import Footer from "~/components/Footer/Footer";
import HeroSection from "~/components/IndexPage/HeroSection/HeroSection";
import NavigationBar from "~/components/NavigationBar/NavigationBar";

export default function Index() {
  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <HeroSection />
        <FeatureSection />
      </main>
      <Footer />
    </>
  );
}
