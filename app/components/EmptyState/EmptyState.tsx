import type { ReactChild } from "react";

type EmptyStateProps = {
  iconContent: ReactChild;
  text: string;
};

export default function EmptyState({ iconContent, text }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center my-16">
      {iconContent}
      <p className="mt-8 text-center text-xl">{text}</p>
    </div>
  );
}
