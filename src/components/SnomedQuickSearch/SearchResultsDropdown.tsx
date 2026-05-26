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
        "z-20 w-full rounded-b-xl border-x border-b border-teal-600 bg-white motion-safe:animate-dropdown-enter md:absolute",
        "shadow-[4px_0_0_0_rgb(204_251_241),-4px_0_0_0_rgb(204_251_241),0_4px_0_0_rgb(204_251_241),4px_4px_0_0_rgb(204_251_241),-4px_4px_0_0_rgb(204_251_241),0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-4px_rgb(0_0_0_/_0.1)]",
      )}
    >
      <div className="max-h-72 overflow-y-auto rounded-b-xl">
        {isLoading ? (
          <p className="px-4 py-3 text-sm text-slate-600">Searching...</p>
        ) : null}

        {!isLoading && errorMessage ? (
          <p className="px-4 py-3 text-sm font-medium text-red-600">
            {errorMessage}
          </p>
        ) : null}

        {!isLoading && !errorMessage && concepts.length === 0 ? (
          <p className="px-4 py-3 text-sm text-slate-600">No results found.</p>
        ) : null}

        {!isLoading && !errorMessage && concepts.length > 0 ? (
          <ul
            aria-label="SNOMED CT search results"
            className="divide-y divide-slate-100"
          >
            {concepts.map((concept) => (
              <li key={concept.id}>
                <button
                  type="button"
                  className="w-full cursor-pointer px-4 py-3 text-left text-sm text-slate-800 transition hover:bg-teal-50 focus:bg-teal-50 focus:outline-none"
                  onClick={() => onSelect(concept)}
                >
                  <span className="block truncate font-medium">
                    {highlightMatch(concept.term, searchTerm)}
                  </span>

                  <span className="mt-1 block text-xs text-slate-500">
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
