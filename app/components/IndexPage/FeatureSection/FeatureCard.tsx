import Button from "~/components/Button/Button";
import IconContainer from "~/components/IconContainer/IconContainer";
import type { ReactChild } from "react";

type FeatureCardProps = {
  icon: ReactChild;
  title: string;
  description: string;
  buttonText: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  buttonText,
}: FeatureCardProps) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-12">
      <IconContainer>{icon}</IconContainer>
      <h2 className="font-serif text-3xl font-bold">{title}</h2>
      <p className="mb-2 max-w-[80%] text-center text-xl flex-1">{description}</p>
      <Button className="text-3xl">{buttonText}</Button>
    </div>
  );
}
