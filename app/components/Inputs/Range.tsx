import type { ChangeEventHandler } from "react";

type RangeProps = {
  min?: number;
  max?: number;
  step?: number;
  id: string;
  value: string;
  setValue: ChangeEventHandler<HTMLInputElement>;
};

export default function Range({
  min = 1,
  max = 10,
  step = 1,
  id,
  value,
  setValue,
}: RangeProps) {
  const buildStep = () => {
    const stepArray = [];
    for (let i = min; i <= max; i += step) {
      stepArray.push(
        <div className="flex flex-col items-center justify-center">
          <span className="opacity-50">|</span>
          <span className="mt-1 opacity-70">{i}</span>
        </div>
      );
    }
    return stepArray;
  };

  return (
    <>
      <input
        name={id}
        id={id}
        type="range"
        min={min}
        max={max}
        className="range"
        step={step}
        value={value}
        onChange={setValue}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        {buildStep()}
      </div>
    </>
  );
}
