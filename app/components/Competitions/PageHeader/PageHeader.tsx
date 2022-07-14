import type { ReactChild } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: ReactChild;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <>
      <h1 className="flex-1 font-serif text-5xl font-bold leading-tight">
        {title}
      </h1>
      {subtitle}
    </>
  );
}
