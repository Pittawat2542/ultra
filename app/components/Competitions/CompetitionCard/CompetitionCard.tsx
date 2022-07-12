import Card from "~/components/Card/Card";
import { formatDateTimeString } from "~/utils/time";
import moment from "moment";

type CompetitionCardProps = {
  url: string;
  imageUrl: string;
  title: string;
  submissionDeadline: Date;
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
      imageUrl={imageUrl}
      subtitle={
        hasDeadlinePassed ? (
          <></>
        ) : (
          <p className="mt-6 mb-4 self-end">
            Submission deadline{" "}
            <span className="font-bold">
              {formatDateTimeString(submissionDeadline)}
            </span>
          </p>
        )
      }
    />
  );
}
