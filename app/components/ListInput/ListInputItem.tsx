import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";

import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import TextInput from "../TextInput/TextInput";

type ListInputItemProps = {
  id: number;
  text: string;
  maxLength?: number;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

export default function ListInputItem({
  id,
  text,
  maxLength,
  onDelete,
  onEdit,
}: ListInputItemProps) {
  const editItemRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <li className="my-2 flex justify-between rounded-lg px-8 py-2 font-normal transition hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10">
        <div className="flex items-center gap-16">
          <p>{id + 1}</p>
          <div>
            {isEditing ? (
              <div className="flex items-center justify-around gap-2">
                <TextInput
                  className="my-0 mr-4 w-full min-w-[250px]"
                  value={text}
                  inputRef={editItemRef}
                  id={`edit-${id}-${text}`}
                  maxLength={maxLength}
                  isRequired={true}
                />
                <Button
                  onClick={() => setIsEditing(false)}
                  className="w-2/3 px-4 py-1 text-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit(id, editItemRef.current.value);
                    setIsEditing(false);
                  }}
                  className="w-2/3 px-4 py-1 text-xl"
                >
                  Save
                </Button>
              </div>
            ) : (
              <p className="font-bold">{text}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
            className="flex items-center rounded px-4 py-1 transition hover:bg-white hover:bg-opacity-30 focus:bg-opacity-30"
          >
            <PencilIcon className="mr-2 h-5 w-5" /> Edit
          </button>
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
