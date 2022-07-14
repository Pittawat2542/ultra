import { UploadIcon } from "@heroicons/react/outline";
import { useDropzone } from "react-dropzone";

type FileUploadInputProps = {
  isRequired?: boolean;
  labelText?: string;
  id: string;
  maxNumberOfFiles?: number;
  maxSizeOfFile?: number;
  callToActionText: string;
};

export default function FileUploadInput({
  isRequired = false,
  labelText,
  id,
  maxNumberOfFiles = 1,
  maxSizeOfFile = 10,
  callToActionText,
}: FileUploadInputProps) {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });

  return (
    <label className="my-4 block font-bold" htmlFor="poster-image">
      {labelText}{" "}
      {isRequired && <span className="font-normal italic"> (Required)</span>}
      <div
        {...getRootProps()}
        className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white px-8 py-16 font-normal hover:bg-white hover:bg-opacity-30 focus:bg-opacity-30"
      >
        <input name="poster-image" id="poster-image" {...getInputProps()} />
        <UploadIcon className="mb-2 h-16 w-16 stroke-1" />
        <p className="text-xl font-bold">{callToActionText}</p>
        <p className="mb-3">
          Drag &amp; Drop to This Area or click to choose from file manager.
        </p>
        <p className="italic">
          <span className="font-bold">Accepted Format:</span> .jpg, .jpeg, .png
        </p>
        <p className="italic">
          <span className="font-bold">Recommended resolution:</span> ??? x ???,
        </p>
        <p className="italic">
          <span className="font-bold">Maximum number of file:</span>{" "}
          {maxNumberOfFiles} file
        </p>
        <p className="italic">
          <span className="font-bold">Maximum file size:</span> {maxSizeOfFile}
          MB
        </p>
      </div>
    </label>
  );
}
