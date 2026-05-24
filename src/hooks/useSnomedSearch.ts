import { useQuery } from "@tanstack/react-query";

import {
  MIN_SEARCH_LENGTH,
  SNOMED_QUERY_STALE_TIME_IN_MS,
} from "@/constants/snomedSearch";
import { searchSnomedConcepts } from "@/lib/snomed";

type UseSnomedSearchParams = Readonly<{
  term: string;
  limit: number;
}>;

export function useSnomedSearch({ term, limit }: UseSnomedSearchParams) {
  const normalizedTerm = term.trim();

  const query = useQuery({
    queryKey: ["snomed-concepts", normalizedTerm, limit],
    queryFn: () => searchSnomedConcepts(normalizedTerm, limit),
    enabled: normalizedTerm.length >= MIN_SEARCH_LENGTH,
    staleTime: SNOMED_QUERY_STALE_TIME_IN_MS,
  });

  return {
    concepts: query.data ?? [],
    errorMessage: query.error?.message ?? "",
    isError: query.isError,
    isFetching: query.isFetching,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
  };
}
