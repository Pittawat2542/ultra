import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";

import Button from "../Button/Button";
import { Cropper } from "react-cropper";
import Divider from "../Divider/Divider";
import FileUploadInput from "../FileUploadInput/FileUploadInput";
import type { Marking } from "./ImageListInput";
import { MarkingMediaType } from "@prisma/client";
import SelectInput from "../SelectInput/SelectInput";
import TextInput from "../TextInput/TextInput";

type ImageListInputItemProps = {
  id: number;
  marking: Marking;
  maxLength?: number;
  onDelete: (id: number) => void;
  onEdit: (id: number, newMarking: Marking) => void;
};

export default function ImageListInputItem({
  id,
  marking,
  maxLength,
  onDelete,
  onEdit,
}: ImageListInputItemProps) {
  const editItemRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isEditing, setIsEditing] = useState(false);
  const cropperRef = useRef<HTMLImageElement>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<MarkingMediaType>(
    MarkingMediaType.IMAGE
  );
  const [text, setText] = useState("");

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
  };

  const onMediaTypeChange = (mediaType: string) => {
    setSelectedMediaType(mediaType as MarkingMediaType);
  };

  return (
    <>
      <li className="my-2 flex justify-between rounded-lg px-8 py-2 font-normal transition hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10">
        <div className="flex items-center gap-16">
          <p>{id + 1}</p>
          <div>
            {isEditing ? (
              <>
                <div className="my-4 px-8">
                  <Cropper
                    src="https://cdn.pixabay.com/photo/2022/05/24/04/38/study-7217599_1280.jpg"
                    className="mb-4 h-[400px] w-full"
                    crop={onCrop}
                    ref={cropperRef}
                  />

                  <SelectInput
                    labelText="Associated Media Type"
                    choices={Object.values(MarkingMediaType)}
                    selectedChoice={selectedMediaType}
                    setSelectedChoice={onMediaTypeChange}
                  />

                  {selectedMediaType === MarkingMediaType.IMAGE && (
                    <FileUploadInput
                      id="media-image"
                      type="image"
                      callToActionText="Upload Image Associated with this Marking"
                    />
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
                    <FileUploadInput
                      id="media-model"
                      type="model"
                      callToActionText="Upload Model Associated with this Marking"
                    />
                  )}
                  <div className="mt-4 flex justify-end gap-4">
                    <Button
                      onClick={() => setIsEditing(false)}
                      className="w-1/12 px-4 py-1 text-xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        onEdit(id, {
                          id: 0,
                          markingImagePath:
                            "https://cdn.pixabay.com/photo/2022/05/24/04/38/study-7217599_1280.jpg",
                          mediaType: MarkingMediaType.IMAGE,
                          mediaPath:
                            "https://cdn.pixabay.com/photo/2022/05/24/04/38/study-7217599_1280.jpg",
                        });
                        setIsEditing(false);
                      }}
                      className="w-1/12 px-4 py-1 text-xl"
                    >
                      Save
                    </Button>
                  </div>
                </div>
                <Divider className="my-2" />
              </>
            ) : (
              <div className="flex gap-8">
                <img
                  className="max-h-[150px]"
                  src={marking.markingImagePath}
                  alt=""
                />
                <div className="flex flex-col justify-center">
                  <p className="mb-2">
                    <span className="font-bold">Media Type:</span>{" "}
                    {marking.mediaType}
                  </p>
                  <p>
                    <span className="font-bold">Media:</span>{" "}
                    {marking.mediaPath}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
              className="flex items-center rounded px-4 py-1 transition hover:bg-white hover:bg-opacity-30 focus:bg-opacity-30"
            >
              <PencilIcon className="mr-2 h-5 w-5" /> Edit
            </button>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(id);
              //TODO: Toggle confirmation modal
            }}
            className="flex items-center rounded px-4 py-1 transition hover:bg-white hover:bg-opacity-30 focus:bg-opacity-30"
          >
            <TrashIcon className="mr-2 h-5 w-5" /> Delete
          </button>
        </div>
      </li>
      <Divider className="my-2" />
    </>
  );
}
