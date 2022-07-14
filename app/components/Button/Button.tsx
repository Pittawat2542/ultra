import type { MouseEventHandler, ReactChild } from "react";

type ButtonProps = {
  className?: string;
  children: ReactChild | ReactChild[];
  onClick?: MouseEventHandler;
};

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg bg-white bg-opacity-10 bg-clip-padding px-6 py-2 font-serif text-2xl font-bold tracking-wide backdrop-blur-xl backdrop-filter transition hover:bg-opacity-30 ${className}`}
    >
      {children}
    </button>
  );
}
