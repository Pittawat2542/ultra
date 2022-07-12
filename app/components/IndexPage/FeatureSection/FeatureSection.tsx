import {
  CubeTransparentIcon,
  PresentationChartBarIcon,
  UploadIcon,
} from "@heroicons/react/outline";

import FeatureCard from "./FeatureCard";

export default function FeatureSection() {
  return (
    <section className="w-full gap-8 mt-32 grid grid-cols-3">
      <FeatureCard
        icon={<CubeTransparentIcon className="h-12 w-12" />}
        title="Explore"
        description="Explore poster exhibitions, participate in voting your favorite poster, and learn new things across fields."
        buttonText="Explore"
      />
      <FeatureCard
        icon={<UploadIcon className="h-12 w-12" />}
        title="Submit"
        description="Submit your poster, both in normal and AR format, and get feedback from the community."
        buttonText="Submit"
      />
      <FeatureCard
        icon={<PresentationChartBarIcon className="h-12 w-12" />}
        title="Organize"
        description="Organize a new poster exhibition, host an amazing event, and share your expertise."
        buttonText="Organize"
      />
    </section>
  );
}
