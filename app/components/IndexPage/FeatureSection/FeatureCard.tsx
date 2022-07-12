import Button from "~/components/Button/Button";
import IconContainer from "~/components/IconContainer/IconContainer";
import { Link } from "@remix-run/react";
import type { ReactChild } from "react";

type FeatureCardProps = {
  icon: ReactChild;
  title: string;
  description: string;
  buttonText: string;
  url: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  buttonText,
  url,
}: FeatureCardProps) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-12">
      <IconContainer>{icon}</IconContainer>
      <h2 className="font-serif text-3xl font-bold">{title}</h2>
      <p className="mb-2 max-w-[80%] flex-1 text-center text-xl">
        {description}
      </p>
      <Button className="text-3xl">
        <Link to={url}>{buttonText}</Link>
      </Button>
    </div>
  );
}
