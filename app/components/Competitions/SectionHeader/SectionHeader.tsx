import { Link } from "@remix-run/react";

type SectionHeaderProps = {
  title: string;
  url?: string;
  className?: string;
};

export default function SectionHeader({ url, title, className }: SectionHeaderProps) {
  return (
    <div className={`mb-12 flex items-end justify-between ${className}`}>
      <h2 className="font-serif text-4xl font-bold leading-10">{title}</h2>
      {url && (
        <Link className="text-xl hover:underline" to={url}>
          View All &gt;
        </Link>
      )}
    </div>
  );
}
