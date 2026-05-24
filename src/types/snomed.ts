export type SnomedConcept = Readonly<{
  id: string;
  term: string;
}>;

export type SnomedApiDescription = Readonly<{
  id?: string;
  term?: string;
}>;

export type SnomedApiConcept = Readonly<{
  id?: string;
  conceptId?: string;
  pt?: SnomedApiDescription;
  fsn?: SnomedApiDescription;
}>;

export type SnomedSearchApiResponse = Readonly<{
  items?: SnomedApiConcept[];
  total?: number;
  limit?: number;
  searchAfter?: string;
}>;
