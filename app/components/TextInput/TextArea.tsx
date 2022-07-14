import { useState } from "react";

type TextAreaProps = {
  isRequired?: boolean;
  labelText: string;
  id: string;
  maxLength?: number;
};

export default function TextArea({
  isRequired = false,
  labelText,
  id,
  maxLength,
}: TextAreaProps) {
  const [input, setInput] = useState("");

  return (
    <label className="my-4 block font-bold" htmlFor={id}>
      <span className="flex justify-between">
        <span>
          {labelText}
          {isRequired && <span className="font-normal italic"> (Required)</span>}
        </span>
        {maxLength && (
          <span className="text-sm font-normal">
            {input.length}/{maxLength} characters
          </span>
        )}
      </span>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name={id}
        id={id}
        rows={5}
        required={isRequired}
        maxLength={maxLength || -1}
        className="mt-2 block w-full rounded-lg bg-white bg-opacity-10 bg-clip-padding px-6 py-2 text-lg font-normal tracking-wide backdrop-blur-xl backdrop-filter transition hover:bg-opacity-30 focus:bg-opacity-30"
      />
    </label>
  );
}
