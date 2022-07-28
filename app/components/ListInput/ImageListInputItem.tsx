import { Form, useSubmit } from "@remix-run/react";

import type { ARMarking } from "@prisma/client";
import Divider from "../Divider/Divider";
import { TrashIcon } from "@heroicons/react/outline";

type ImageListInputItemProps = {
  order: number;
  marking: Omit<ARMarking, "createdAt" | "updatedAt">;
};

export default function ImageListInputItem({
  order,
  marking,
}: ImageListInputItemProps) {
  const submit = useSubmit();

  return (
    <>
      <li className="my-2 flex justify-between rounded-lg px-8 py-2 font-normal transition hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10">
        <div className="flex items-center gap-16">
          <p>{order + 1}</p>
          <div>
            <div className="flex gap-8">
              <img
                className="max-h-[150px]"
                src={marking.markingImagePath}
                alt=""
              />
              <div className="flex flex-col justify-center">
                <p className="mb-2">
                  <span className="font-bold">Media Type:</span>{" "}
                  {marking.associatedMediaType}
                </p>
                <p>
                  <span className="font-bold">Media:</span>{" "}
                  {marking.associatedMediaPath}
                  {marking.associatedMediaType === "IMAGE" && (
                    <img
                      className="ml-8 mt-2 max-h-[150px]"
                      src={marking.associatedMediaPath}
                      alt=""
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center rounded px-4 py-1 transition hover:bg-white hover:bg-opacity-30 focus:bg-opacity-30"
            onClick={(e) => {
              e.preventDefault();
              const data = new FormData();
              data.append("marking-id", marking.id);
              data.append("_action", "delete");
              submit(data, {
                method: "post",
                encType: "multipart/form-data",
              });
            }}
          >
            <TrashIcon className="mr-2 h-5 w-5" /> Delete
          </button>
        </div>
      </li>
      <Divider className="my-2" />
    </>
  );
}
