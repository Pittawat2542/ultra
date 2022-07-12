import { Link } from "@remix-run/react";
import type { ReactChild } from "react";

type CardProps = {
  url: string;
  imageUrl: string;
  title: string;
  subtitle: ReactChild;
};

export default function Card({ url, imageUrl, title, subtitle }: CardProps) {
  return (
    <Link to={url}>
      <article className="hover:cursor group flex h-full flex-col rounded-xl bg-white bg-opacity-10 bg-clip-padding p-8 backdrop-blur-xl backdrop-filter transition hover:bg-opacity-30">
        <img
          className="self-center rounded object-contain transition group-hover:opacity-70"
          src={imageUrl}
          alt=""
        />
        <h1 className="mt-8 font-serif text-3xl font-bold leading-10">
          {title}
        </h1>
        {subtitle}
      </article>
    </Link>
  );
}
