import type { SnomedConcept } from "@/types/snomed";

type SearchSnomedConceptsResponse = Readonly<{
  concepts: SnomedConcept[];
  message?: string;
}>;

export async function searchSnomedConcepts(
  term: string,
  limit: number,
): Promise<SnomedConcept[]> {
  const params = new URLSearchParams({
    term,
    limit: String(limit),
  });

  const response = await fetch(`/api/snomed-search?${params.toString()}`);
  const data = (await response.json()) as SearchSnomedConceptsResponse;

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to search SNOMED CT concepts.");
  }

  return data.concepts;
}
