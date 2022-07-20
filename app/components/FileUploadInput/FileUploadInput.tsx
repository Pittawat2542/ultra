import type {
  ActualFileObject,
  FilePondFile,
  FilePondInitialFile,
} from "filepond";
import { FilePond, registerPlugin } from "react-filepond";
import { useEffect, useState } from "react";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type FileUploadInputProps = {
  isRequired?: boolean;
  labelText?: string;
  id: string;
  maxNumberOfFiles?: number;
  maxSizeOfFile?: number;
  callToActionText: string;
  type: "image" | "model";
};

export default function FileUploadInput({
  isRequired = false,
  labelText,
  id,
  maxNumberOfFiles = 1,
  maxSizeOfFile = 10,
  callToActionText,
  type,
}: FileUploadInputProps) {
  const [files, setFiles] = useState<
    (FilePondFile | FilePondInitialFile | string | Blob)[]
  >([]);

  return (
    <label className="my-4 flex w-full flex-col" htmlFor={id}>
      {labelText && (
        <>
          <span className="font-bold">
            {labelText}
            <span className="font-normal italic"> (Required)</span>
          </span>
        </>
      )}
      <FilePond
        name={id}
        id={id}
        className="mt-2 font-serif"
        //@ts-ignore
        files={files}
        onupdatefiles={setFiles}
        storeAsFile={true}
        required={isRequired}
        maxFiles={maxNumberOfFiles}
      />
    </label>
  );
}
