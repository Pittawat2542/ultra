import { Link } from "@remix-run/react";

type SectionHeaderProps = {
  title: string;
  url: string;
};

export default function SectionHeader({ url, title }: SectionHeaderProps) {
  return (
    <div className="mb-12 flex justify-between items-end">
      <h2 className="font-serif text-4xl font-bold leading-10">{title}</h2>
      <Link className="hover:underline text-xl" to={url}>
        View All &gt;
      </Link>
    </div>
  );
}
