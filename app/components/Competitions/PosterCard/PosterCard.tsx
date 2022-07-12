import Card from "~/components/Card/Card";
import { formatDateTimeString } from "~/utils/time";
import { formatNames } from "~/utils/string";
import moment from "moment";

type PosterCardProps = {
  url: string;
  imageUrl: string;
  title: string;
  authors: string[];
};

export default function PosterCard({
  url,
  imageUrl,
  title,
  authors,
}: PosterCardProps) {
  return (
    <Card
      title={title}
      url={url}
      imageUrl={imageUrl}
      subtitle={
        <p className="mt-6 mb-4 self-end text-lg text-right max-w-[70%]">
          by{" "}
          <span className="font-bold">{formatNames(authors)}</span>
        </p>
      }
    />
  );
}
