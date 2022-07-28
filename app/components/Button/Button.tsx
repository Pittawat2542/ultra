import type { MouseEventHandler, ReactChild } from "react";

type ButtonProps = {
  className?: string;
  children: ReactChild | ReactChild[];
  onClick?: MouseEventHandler;
  type?: "submit";
  value?: string;
  id?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  className,
  onClick,
  type,
  value,
  id,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      value={value}
      id={id}
      name={id}
      disabled={disabled}
      className={`rounded-lg bg-white bg-opacity-10 bg-clip-padding px-6 py-2 font-serif text-2xl font-bold tracking-wide backdrop-blur-xl backdrop-filter transition hover:bg-opacity-30 ${className}`}
    >
      {children}
    </button>
  );
}
