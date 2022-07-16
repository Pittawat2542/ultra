type DateInputProps = {
  id: string;
  labelText?: string;
  isRequired?: boolean;
};

export default function DateInput({
  id,
  labelText,
  isRequired = false,
}: DateInputProps) {
  return (
    <label className="my-4 flex flex-col" htmlFor={id}>
      <span>
        <span className="font-bold">{labelText}</span>
        {isRequired && <span className="font-normal italic"> (Required)</span>}
      </span>
      <input
        className="rounded border-none bg-white bg-opacity-30 text-white"
        type="date"
        name={id}
        id={id}
      />
    </label>
  );
}
