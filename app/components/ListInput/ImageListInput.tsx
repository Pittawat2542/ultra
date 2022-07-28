import type { ARMarking, Poster } from "@prisma/client";
import { useRef, useState } from "react";

import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import FileUploadInput from "../Inputs/FileUploadInput";
import ImageListInputItem from "./ImageListInputItem";
import { MarkingMediaType } from "@prisma/client";
import { PlusIcon } from "@heroicons/react/outline";
import SelectInput from "../Inputs/SelectInput";
import TextInput from "../Inputs/TextInput";

type ImageListInputProps = {
  isRequired?: boolean;
  labelText: string;
  maxItems?: number;
  maxLength?: number;
  posterId: Poster["id"];
  previousMarkings: Omit<ARMarking, "createdAt" | "updatedAt">[];
};

export default function ImageListInput({
  isRequired = false,
  labelText,
  maxItems,
  maxLength,
  previousMarkings,
  posterId,
}: ImageListInputProps) {
  const [selectedMediaType, setSelectedMediaType] = useState<MarkingMediaType>(
    MarkingMediaType.IMAGE
  );
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");

  const onMediaTypeChange = (mediaType: string) => {
    setSelectedMediaType(mediaType as MarkingMediaType);
  };

  return (
    <div className="my-4 font-bold">
      <span className="flex justify-between">
        <span>
          {labelText}
          {isRequired && (
            <span className="font-normal italic"> (Required)</span>
          )}
        </span>
      </span>
      <Divider className="my-2" />
      {previousMarkings.map((mark, index) => (
        <ImageListInputItem key={mark.id} order={index} marking={mark} />
      ))}
      <h3 className="font-serif text-lg my-2">Add New Marking</h3>
      <div className="my-4 px-8 font-normal">
        <input type="hidden" name="poster-id" value={posterId} />
        <input type="hidden" name="media-type" value={selectedMediaType} />
        <FileUploadInput
          id="marking-image"
          type="image"
          labelText="Marking Target Image"
          isRequired={true}
        />
        <SelectInput
          labelText="Associated Media Type"
          choices={Object.values(MarkingMediaType)}
          selectedChoice={selectedMediaType}
          setSelectedChoice={onMediaTypeChange}
        />
        {selectedMediaType === MarkingMediaType.IMAGE && (
          <FileUploadInput id="media-image" type="image" />
        )}
        {selectedMediaType === MarkingMediaType.TEXT && (
          <TextInput
            id="media-text"
            labelText="Type Text Associated with this Marking"
            value={text}
            setValue={setText}
          />
        )}
        {selectedMediaType === MarkingMediaType.THREE_D_MODEL && (
          <FileUploadInput id="media-model" type="model" />
        )}
        <div className="mt-4 flex justify-end gap-4">
          <Button
            onClick={() => setIsAdding(false)}
            className="w-1/12 px-4 py-1 text-xl"
          >
            Cancel
          </Button>
          {/* TODO: Should submit manually, show loading status, and trigger a recompilation, setIsAdding = False */}
          <Button
            type="submit"
            id="_action"
            value="add"
            className="w-1/12 px-4 py-1 text-xl"
          >
            Add
          </Button>
        </div>
      </div>
      <Divider className="my-2" />
    </div>
  );
}
