import type { ReactChild } from "react";

type HeroSectionProps = {
  titleContent: ReactChild;
  subtitleText: string;
  heroImageUrl: string;
  actionContent?: ReactChild;
};

export default function HeroSection({
  titleContent,
  subtitleText,
  heroImageUrl,
  actionContent,
}: HeroSectionProps) {
  return (
    <section className="flex w-full items-center justify-between pt-32">
      <div className="flex max-w-[50%] flex-col">
        {titleContent}
        <p className="font-sans text-xl">{subtitleText}</p>
        {actionContent}
      </div>
      <div className="flex items-center justify-end">
        <img src={heroImageUrl} alt="" />
      </div>
    </section>
  );
}
