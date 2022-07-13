type DividerProps = {
  className?: string;
};

export default function Divider({ className }: DividerProps) {
  return (
    <hr
      className={`w-full border-[0.5px] border-solid border-slate-400 ${className}`}
    />
  );
}
