import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import { Link } from "@remix-run/react";
import { NUMBER_OF_ITEMS_PER_PAGE } from "~/constants/pagination";

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  totalItems: number;
  baseUrl: string;
};

export default function Pagination({
  currentPage,
  totalPage,
  totalItems,
  baseUrl,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {currentPage !== 1 && (
          <Link
            to={currentPage - 1 < 1 ? "#" : `${baseUrl}/${currentPage - 1}`}
            className="relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
          >
            {" "}
            Previous{" "}
          </Link>
        )}
        {currentPage < totalPage && (
          <Link
            to={
              currentPage >= totalPage ? "#" : `${baseUrl}/${currentPage + 1}`
            }
            className="relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
          >
            {" "}
            Next{" "}
          </Link>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * NUMBER_OF_ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * NUMBER_OF_ITEMS_PER_PAGE, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              to={currentPage - 1 < 1 ? "#" : `${baseUrl}/${currentPage - 1}`}
              className={`relative inline-flex items-center rounded-l-md  px-2 py-2 text-sm font-medium hover:bg-white hover:bg-opacity-10 ${
                currentPage === 1 && "cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
            <Link
              to="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center rounded bg-white bg-opacity-10 px-4 py-2 text-sm font-medium hover:bg-white hover:bg-opacity-30"
            >
              {" "}
              {currentPage}{" "}
            </Link>
            <Link
              to={
                currentPage >= totalPage ? "#" : `${baseUrl}/${currentPage + 1}`
              }
              className={`relative inline-flex items-center rounded-r-md  px-2 py-2 text-sm font-medium hover:bg-white hover:bg-opacity-10 ${
                currentPage >= totalPage && "cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
