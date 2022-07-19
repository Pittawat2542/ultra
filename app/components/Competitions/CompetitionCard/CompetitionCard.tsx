import Card from "~/components/Card/Card";
import { DEFAULT_COVER_IMAGE } from "~/constants/images";
import { formatDateTimeString } from "~/utils/time";
import moment from "moment";

type CompetitionCardProps = {
  url: string;
  imageUrl: string | null;
  title: string;
  submissionDeadline: string;
};

export default function CompetitionCard({
  url,
  imageUrl,
  title,
  submissionDeadline,
}: CompetitionCardProps) {
  const hasDeadlinePassed = moment(submissionDeadline).isBefore(moment());

  return (
    <Card
      title={title}
      url={url}
      imageUrl={imageUrl ?? DEFAULT_COVER_IMAGE}
      subtitle={
        hasDeadlinePassed ? (
          <></>
        ) : (
          <p className="mt-6 mb-4 self-end">
            Submission deadline{" "}
            <span className="font-bold">
              {formatDateTimeString(new Date(submissionDeadline))}
            </span>
          </p>
        )
      }
    />
  );
}
