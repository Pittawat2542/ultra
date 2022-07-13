import { Award } from "react-feather";
import Card from "~/components/Card/Card";
import HorizontalCard from "~/components/Card/HorizontalCard";
import type { ReactChild } from "react";
import { formatNames } from "~/utils/string";

type PosterCardProps = {
  url: string;
  imageUrl: string;
  title: string;
  authors: string[];
  rank?: number;
};

export default function PosterCard({
  url,
  imageUrl,
  title,
  authors,
  rank,
}: PosterCardProps) {
  let rightContent: ReactChild | undefined;
  if (rank && rank > 0 && rank <= 3) {
    rightContent = (
      <>
        <Award className="h-3/4 w-3/4 stroke-1" />
        <p className="absolute top-7 font-serif text-4xl font-bold">{rank}</p>
      </>
    );
  } else if (rank) {
    rightContent = (
      <>
        <p className="font-serif text-5xl font-bold">#{rank}</p>
      </>
    );
  }

  return rank ? (
    <HorizontalCard
      title={title}
      url={url}
      imageUrl={imageUrl}
      subtitle={
        <p className="mt-6 mb-4 text-lg">
          by <span className="font-bold">{formatNames(authors)}</span>
        </p>
      }
      rightContent={rightContent}
    />
  ) : (
    <Card
      title={title}
      url={url}
      imageUrl={imageUrl}
      subtitle={
        <p className="mt-6 mb-4 max-w-[70%] self-end text-right text-lg">
          by <span className="font-bold">{formatNames(authors)}</span>
        </p>
      }
    />
  );
}
