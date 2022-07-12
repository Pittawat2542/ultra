import type { ReactChild } from "react";

type IconContainerProps = {
  children: ReactChild | ReactChild[];
};

export default function IconContainer({ children }: IconContainerProps) {
  return (
    <div className="rounded-xl bg-white bg-opacity-10 bg-clip-padding p-4 backdrop-blur-xl backdrop-filter">
      {children}
    </div>
  );
}
