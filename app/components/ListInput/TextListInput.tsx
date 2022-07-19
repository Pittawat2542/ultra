import { useRef, useState } from "react";

import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import { PlusIcon } from "@heroicons/react/outline";
import TextInput from "../TextInput/TextInput";
import TextListInputItem from "./TextListInputItem";

type TextListInputProps = {
  isRequired?: boolean;
  labelText: string;
  maxItems?: number;
  addNewLabelText: string;
  maxLength?: number;
};

export default function TextListInput({
  isRequired = false,
  labelText,
  maxItems,
  maxLength,
  addNewLabelText,
}: TextListInputProps) {
  //TODO: Refactor duplicate code with TextListInputItem
  const [isAdding, setIsAdding] = useState(false);
  const [listItems, setListItems] = useState<string[]>([]);
  const [newText, setNewText] = useState("");
  const addNewItemRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const onAddNewItem = (text: string) => {
    if (text.length > 0) {
      setListItems([...listItems, text]);
    }
  };

  const onDeleteItem = (itemId: number) => {
    setListItems(listItems.filter((_, index) => index !== itemId));
  };

  const onEditItem = (itemId: number, newText: string) => {
    setListItems(
      listItems.map((text, index) => {
        if (index === itemId) {
          return newText;
        }
        return text;
      })
    );
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
        <TextListInputItem
          key={index}
          id={index}
          text={item}
          onEdit={onEditItem}
          onDelete={onDeleteItem}
          maxLength={maxLength}
        />
      ))}
      {isAdding ? (
        <>
          <div className="my-4 px-8">
            <TextInput
              inputRef={addNewItemRef}
              id={`new-${addNewLabelText.toLowerCase()}`}
              labelText={`Add New ${addNewLabelText}`}
              maxLength={maxLength}
              isRequired={true}
              value={newText}
              setValue={setNewText}
            />
            <div className="flex justify-end gap-4">
              <Button
                onClick={() => setIsAdding(false)}
                className="w-1/12 px-4 py-1 text-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onAddNewItem(addNewItemRef.current.value);
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
