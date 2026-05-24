"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { MIN_SEARCH_LENGTH, RESULT_LIMIT } from "@/constants/snomedSearch";
import { useSnomedSearch } from "@/hooks/useSnomedSearch";
import type { SnomedConcept } from "@/types/snomed";

import { SearchResultsDropdown } from "./SearchResultsDropdown";

type SnomedQuickSearchProps = Readonly<{
  onSelect: (concept: SnomedConcept) => void;
}>;

export function SnomedQuickSearch({ onSelect }: SnomedQuickSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [limit, setLimit] = useState<number>(RESULT_LIMIT.DEFAULT);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [validationError, setValidationError] = useState("");

  const searchContainerRef = useRef<HTMLFormElement>(null);

  const { concepts, errorMessage, isError, isFetching } = useSnomedSearch({
    term: submittedTerm,
    limit,
  });

  const normalizedSearchTerm = searchTerm.trim();
  const canSearch = normalizedSearchTerm.length >= MIN_SEARCH_LENGTH;
  const shouldShowSearching = isFetching && isDropdownOpen;

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  function handleSearch() {
    if (!canSearch) {
      setValidationError("Search term must be at least 2 characters long.");
      setIsDropdownOpen(false);
      return;
    }

    setValidationError("");
    setSubmittedTerm(normalizedSearchTerm);
    setIsDropdownOpen(true);
  }

  function handleSelect(concept: SnomedConcept) {
    onSelect(concept);
    setSearchTerm(concept.term);
    setIsDropdownOpen(false);
  }

  function handleLimitChange(value: string) {
    const nextLimit = Number(value);

    if (!Number.isFinite(nextLimit)) {
      return;
    }

    setLimit(Math.min(Math.max(nextLimit, RESULT_LIMIT.MIN), RESULT_LIMIT.MAX));

    if (submittedTerm.trim().length >= MIN_SEARCH_LENGTH) {
      setIsDropdownOpen(true);
    }
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[1fr_160px]">
        <form
          ref={searchContainerRef}
          className="relative"
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <label
            htmlFor="snomed-search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Search term
          </label>

          <div
            className={clsx(
              "flex overflow-hidden rounded-xl border border-slate-300 bg-white transition",
              "focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-100",
              isDropdownOpen &&
                "rounded-b-none border-teal-600 ring-4 ring-teal-100",
            )}
          >
            <input
              id="snomed-search"
              type="search"
              value={searchTerm}
              minLength={MIN_SEARCH_LENGTH}
              placeholder="Search SNOMED CT concepts..."
              aria-invalid={Boolean(validationError)}
              aria-describedby={
                validationError ? "snomed-search-error" : undefined
              }
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setValidationError("");

                if (!event.target.value.trim()) {
                  setIsDropdownOpen(false);
                  setSubmittedTerm("");
                }
              }}
              className="h-12 min-w-0 flex-1 bg-white px-4 text-sm text-slate-950 outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={isFetching}
              className="h-12 bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              {shouldShowSearching ? "Searching..." : "Search"}
            </button>
          </div>

          <SearchResultsDropdown
            concepts={concepts}
            errorMessage={isError ? errorMessage : ""}
            isLoading={shouldShowSearching}
            isOpen={isDropdownOpen}
            searchTerm={submittedTerm}
            onSelect={handleSelect}
          />
        </form>

        <div>
          <label
            htmlFor="result-limit"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Result limit
          </label>

          <input
            id="result-limit"
            type="number"
            min={RESULT_LIMIT.MIN}
            max={RESULT_LIMIT.MAX}
            value={limit}
            onChange={(event) => handleLimitChange(event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          />
        </div>
      </div>

      {validationError ? (
        <p
          id="snomed-search-error"
          className="text-sm font-medium text-red-600"
        >
          {validationError}
        </p>
      ) : null}
    </section>
  );
}
