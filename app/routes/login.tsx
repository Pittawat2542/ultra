import Button from "~/components/Button/Button";
import Footer from "~/components/Footer/Footer";
import HeroSection from "~/components/HeroSection/HeroSection";
import NavigationBar from "~/components/NavigationBar/NavigationBar";

const heroContent = {
  titleContent: <h1 className="mb-8 font-serif text-6xl font-bold">Login</h1>,
  subtitleText: "Get started with all-new experience in exploring exhibitions.",
  heroImageUrl: "/images/hero-login.png",
  actionContent: <Button className="mt-8">SignIn with Google</Button>,
};

export default function Login() {
  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <HeroSection
          titleContent={heroContent.titleContent}
          subtitleText={heroContent.subtitleText}
          heroImageUrl={heroContent.heroImageUrl}
          actionContent={heroContent.actionContent}
        />
      </main>
      <Footer />
    </>
  );
}
