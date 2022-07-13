import { Link } from "@remix-run/react";
import type { ReactChild } from "react";

type HorizontalCardProps = {
  url: string;
  imageUrl: string;
  title: string;
  subtitle: ReactChild;
  rightContent?: ReactChild;
};

export default function HorizontalCard({
  url,
  imageUrl,
  title,
  subtitle,
  rightContent
}: HorizontalCardProps) {
  return (
    <Link to={url}>
      <article className="hover:cursor group flex h-full gap-8 rounded-xl bg-white bg-opacity-10 bg-clip-padding p-8 backdrop-blur-xl backdrop-filter transition hover:bg-opacity-30">
        <img
          className="max-h-[240px] max-w-[30%] flex-1 self-center rounded object-cover transition group-hover:opacity-70"
          src={imageUrl}
          alt=""
        />
        <div className="flex flex-1 justify-between">
          <div className="flex flex-1 flex-col">
            <h1 className=" font-serif text-3xl font-bold leading-10">
              {title}
            </h1>
            {subtitle}
          </div>
          <div className="relative flex max-w-[20%] flex-1 items-center justify-center self-center">
            {rightContent}
          </div>
        </div>
      </article>
    </Link>
  );
}
