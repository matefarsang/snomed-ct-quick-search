import clsx from "clsx";

import type { SnomedConcept } from "@/types/snomed";
import { highlightMatch } from "@/utils/highlightMatch";

type SearchResultsDropdownProps = Readonly<{
  concepts: SnomedConcept[];
  errorMessage: string;
  isLoading: boolean;
  isOpen: boolean;
  searchTerm: string;
  onSelect: (concept: SnomedConcept) => void;
}>;

export function SearchResultsDropdown({
  concepts,
  errorMessage,
  isLoading,
  isOpen,
  searchTerm,
  onSelect,
}: SearchResultsDropdownProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={clsx(
        "absolute right-0 left-0 z-20 min-w-0 overflow-hidden rounded-b-xl border-x border-b border-teal-600 bg-white motion-safe:animate-dropdown-enter",
        "shadow-[4px_0_0_0_rgb(204_251_241),-4px_0_0_0_rgb(204_251_241),0_4px_0_0_rgb(204_251_241),4px_4px_0_0_rgb(204_251_241),-4px_4px_0_0_rgb(204_251_241),0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-4px_rgb(0_0_0_/_0.1)]",
      )}
    >
      <div className="max-h-72 min-w-0 overflow-hidden overflow-y-auto rounded-b-xl">
        {isLoading ? (
          <p className="truncate px-4 py-3 text-sm text-slate-600">
            Searching...
          </p>
        ) : null}

        {!isLoading && errorMessage ? (
          <p className="truncate px-4 py-3 text-sm font-medium text-red-600">
            {errorMessage}
          </p>
        ) : null}

        {!isLoading && !errorMessage && concepts.length === 0 ? (
          <p className="truncate px-4 py-3 text-sm text-slate-600">
            No results found.
          </p>
        ) : null}

        {!isLoading && !errorMessage && concepts.length > 0 ? (
          <ul
            aria-label="SNOMED CT search results"
            className="min-w-0 divide-y divide-slate-100 overflow-hidden"
          >
            {concepts.map((concept) => (
              <li key={concept.id} className="min-w-0 overflow-hidden">
                <button
                  type="button"
                  title={`${concept.id} | ${concept.term}`}
                  aria-label={`Select SNOMED CT concept ${concept.id}, ${concept.term}`}
                  className="grid w-full min-w-0 cursor-pointer grid-cols-[minmax(0,1fr)] overflow-hidden px-4 py-3 text-left text-sm text-slate-800 transition hover:bg-teal-50 focus:bg-teal-50 focus:outline-none"
                  onClick={() => onSelect(concept)}
                >
                  <span className="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                    {highlightMatch(concept.term, searchTerm)}
                  </span>

                  <span className="mt-1 block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-500">
                    {concept.id}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
