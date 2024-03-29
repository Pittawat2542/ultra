import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";

import { Fragment } from "react";

type SelectInputProps = {
  choices: string[];
  selectedChoice: string;
  setSelectedChoice: (choice: string) => void;
  labelText: string;
  className?: string;
  isRequired?: boolean;
};

export default function SelectInput({
  choices,
  selectedChoice,
  setSelectedChoice,
  labelText,
  className,
  isRequired = false,
}: SelectInputProps) {
  return (
    <label className={`flex w-1/4 items-center ${className}`}>
      <span className="text-bold mr-4 min-w-fit">
        {labelText}
        {isRequired && <span className="font-normal italic"> (Required)</span>}
      </span>
      <Listbox value={selectedChoice} onChange={setSelectedChoice}>
        <div className="relative mt-1 w-full">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white bg-opacity-10 py-2 pl-3 pr-10 text-left hover:bg-opacity-30 focus:bg-opacity-30 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <span className="block truncate">{selectedChoice}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black bg-opacity-90 py-1 text-base shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm">
              {choices.map((choice, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "text-bold bg-white bg-opacity-30" : "text-white"
                    }`
                  }
                  value={choice}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {choice}
                      </span>
                      {selected ? (
                        <span className="text-bold absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </label>
  );
}
