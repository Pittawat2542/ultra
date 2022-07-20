type TimeInputProps = {
  id: string;
  labelText?: string;
  isRequired?: boolean;
  value: string;
  setValue: (value: string) => void;
};

export default function TimeInput({
  id,
  labelText,
  isRequired = false,
  value,
  setValue,
}: TimeInputProps) {
  return (
    <label className="my-4 flex flex-col" htmlFor={id}>
      {labelText && (
        <span>
          <span className="font-bold">{labelText}</span>
          {isRequired && (
            <span className="font-normal italic"> (Required)</span>
          )}
        </span>
      )}
      <input
        className="rounded border-none bg-white bg-opacity-30 text-white"
        type="time"
        name={id}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
}
