import { useRef, useState } from "react";

import Button from "../Button/Button";
import { Cropper } from "react-cropper";
import Divider from "../Divider/Divider";
import FileUploadInput from "../FileUploadInput/FileUploadInput";
import ImageListInputItem from "./ImageListInputItem";
import { PlusIcon } from "@heroicons/react/outline";
import SelectInput from "../SelectInput/SelectInput";
import TextInput from "../TextInput/TextInput";

type ImageListInputProps = {
  isRequired?: boolean;
  labelText: string;
  maxItems?: number;
  addNewLabelText: string;
  maxLength?: number;
};

export enum MediaType {
  IMAGE = "Image",
  TEXT = "Text",
  THREE_D_MODEL = "3D Model",
}

export type Marking = {
  id: number;
  markingImagePath: string;
  mediaType: MediaType;
  mediaPath: string;
};

export default function ImageListInput({
  isRequired = false,
  labelText,
  maxItems,
  maxLength,
  addNewLabelText,
}: ImageListInputProps) {
  //TODO: Refactor duplicate code with ImageListInputItem
  const [selectedMediaType, setSelectedMediaType] = useState(MediaType.IMAGE);
  const [isAdding, setIsAdding] = useState(false);
  const [listItems, setListItems] = useState<Marking[]>([]);
  const cropperRef = useRef<HTMLImageElement>(null);

  const onMediaTypeChange = (mediaType: string) => {
    setSelectedMediaType(mediaType as MediaType);
  };

  const onAddNewItem = (marking: Marking) => {
    setListItems([...listItems, marking]);
  };

  const onDeleteItem = (itemId: number) => {
    setListItems(listItems.filter((item) => item.id !== itemId));
  };

  const onEditItem = (itemId: number, newMarking: Marking) => {
    setListItems(
      listItems.map((item) =>
        item.id === itemId ? { ...item, ...newMarking } : item
      )
    );
  };

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
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
      {listItems.map((item, index) => (
        <ImageListInputItem
          key={index}
          id={index}
          marking={item}
          onEdit={onEditItem}
          onDelete={onDeleteItem}
          maxLength={maxLength}
        />
      ))}
      {isAdding ? (
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
              choices={Object.values(MediaType)}
              selectedChoice={selectedMediaType}
              setSelectedChoice={onMediaTypeChange}
            />
            {selectedMediaType === MediaType.IMAGE && (
              <FileUploadInput
                id="media-image"
                type="image"
                callToActionText="Upload Image Associated with this Marking"
              />
            )}
            {selectedMediaType === MediaType.TEXT && (
              <TextInput
                id="media-text"
                labelText="Type Text Associated with this Marking"
              />
            )}
            {selectedMediaType === MediaType.THREE_D_MODEL && (
              <FileUploadInput
                id="media-model"
                type="model"
                callToActionText="Upload Model Associated with this Marking"
              />
            )}
            <div className="mt-4 flex justify-end gap-4">
              <Button
                onClick={() => setIsAdding(false)}
                className="w-1/12 px-4 py-1 text-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onAddNewItem({
                    id: 0,
                    markingImagePath:
                      "https://cdn.pixabay.com/photo/2022/05/24/04/38/study-7217599_1280.jpg",
                    mediaType: MediaType.IMAGE,
                    mediaPath:
                      "https://cdn.pixabay.com/photo/2022/05/24/04/38/study-7217599_1280.jpg",
                  });
                  setIsAdding(false);
                }}
                className="w-1/12 px-4 py-1 text-xl"
              >
                Add
              </Button>
            </div>
          </div>
          <Divider className="my-2" />
        </>
      ) : (
        (maxItems ? listItems.length < maxItems : true) && (
          <>
            <div className="flex px-4">
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center rounded px-2 py-1 transition hover:bg-white hover:bg-opacity-30 focus:bg-opacity-30"
              >
                <PlusIcon className="mr-4 h-5 w-5" /> Add New {addNewLabelText}
              </button>
            </div>
            <Divider className="my-2" />
          </>
        )
      )}
    </div>
  );
}
