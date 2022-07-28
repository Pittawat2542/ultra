import { useRef } from "react";

type FileUploadInputProps = {
  isRequired?: boolean;
  labelText?: string;
  id: string;
  maxSizeOfFile?: number;
  type: "image" | "model";
};

export default function FileUploadInput({
  isRequired = false,
  labelText,
  id,
  maxSizeOfFile = 10,
  type,
}: FileUploadInputProps) {
  const inputUploadRef = useRef<HTMLInputElement>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);

  const onUploadedImageChange = () => {
    const numberOfFile = inputUploadRef?.current?.files?.length ?? 0;

    if (numberOfFile > 0 && numberOfFile < 2) {
      const file = inputUploadRef.current!.files![0];
      previewImageRef.current!.src = URL.createObjectURL(file);
      previewImageRef.current!.classList.remove("hidden");
    }
  };

  return (
    <label className="my-4 flex w-full flex-col" htmlFor={id}>
      {labelText && (
        <>
          <span className="mb-2 font-bold">
            {labelText}
            {isRequired && (
              <span className="font-normal italic"> (Required)</span>
            )}
          </span>
        </>
      )}

      <input
        ref={inputUploadRef}
        type="file"
        name={id}
        id={id}
        accept={type === "image" ? ".jpg,.jpeg,.gif,.png" : ".gltf,.glb"}
        required={isRequired}
        onChange={onUploadedImageChange}
      />
      {type === "image" && (
        <img
          ref={previewImageRef}
          id={`${id}-preview`}
          alt="uploaded preview"
          className="mt-2 hidden max-h-[300px] object-contain"
        />
      )}
    </label>
  );
}
