import type { MutableRefObject } from "react";
import { useState } from "react";

type TextInputProps = {
  className?: string;
  isRequired?: boolean;
  labelText?: string;
  id: string;
  maxLength?: number;
  inputRef?: MutableRefObject<HTMLInputElement>;
  value?: string;
};

export default function TextInput({
  className,
  isRequired = false,
  labelText,
  id,
  maxLength,
  inputRef,
  value,
}: TextInputProps) {
  const [input, setInput] = useState(value ?? "");

  return (
    <label className={`my-4 block font-bold ${className}`} htmlFor={id}>
      {labelText && (
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
      )}
      <input
        ref={inputRef}
        name={id}
        id={id}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required={isRequired}
        maxLength={maxLength || -1}
        type="text"
        className={`${
          labelText ? "mt-2" : ""
        } block w-full rounded-lg bg-white bg-opacity-10 bg-clip-padding px-6 py-2 text-lg font-normal tracking-wide backdrop-blur-xl backdrop-filter transition hover:bg-opacity-30 focus:bg-opacity-30`}
      />
    </label>
  );
}
