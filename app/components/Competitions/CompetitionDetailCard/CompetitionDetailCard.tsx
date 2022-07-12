import { Link } from "@remix-run/react";
import { formatDateTimeString } from "~/utils/time";
import moment from 'moment'

type CompetitionDetailCardProps = {
  url: string;
  imageUrl: string;
  title: string;
  submissionDeadline: Date;
};

export default function CompetitionDetailCard({
  url,
  imageUrl,
  title,
  submissionDeadline,
}: CompetitionDetailCardProps) {
  const hasDeadlinePassed = moment(submissionDeadline).isBefore(moment());
  
  return (
    <Link to={url}>
      <article className="hover:cursor group flex flex-col rounded-xl bg-white bg-opacity-10 bg-clip-padding p-8 backdrop-blur-xl backdrop-filter transition hover:bg-opacity-30">
        <img
          className="self-center rounded object-contain transition group-hover:opacity-70"
          src={imageUrl}
          alt=""
        />
        <h1 className="mt-8 font-serif text-3xl font-bold leading-10">{title}</h1>
        {hasDeadlinePassed ? <></> : <p className="mt-6 mb-4 self-end">
          Submission deadline{" "}
          <span className="font-bold">
            {formatDateTimeString(submissionDeadline)}
          </span>
        </p>}
      </article>
    </Link>
  );
}
