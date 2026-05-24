"use client";

import { useState } from "react";
import { SectionLayout } from "@/components/SectionLayout/SectionLayout";
import { SelectedConceptDisplay } from "@/components/SnomedQuickSearch/SelectedConceptDisplay";
import { SnomedQuickSearch } from "@/components/SnomedQuickSearch/SnomedQuickSearch";
import type { SnomedConcept } from "@/types/snomed";

export default function HomePage() {
  const [selectedConcept, setSelectedConcept] = useState<SnomedConcept | null>(
    null,
  );

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <SectionLayout>
        <div className="space-y-3 text-center">
          <p className="text-sm font-medium tracking-wide text-teal-700 uppercase">
            IQVIA / B2i Healthcare Assignment
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            SNOMED CT Quick Search
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600">
            Search SNOMED CT concepts, configure the number of displayed
            results, and select a concept for use by another component.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <SnomedQuickSearch onSelect={setSelectedConcept} />

          <SelectedConceptDisplay concept={selectedConcept} />
        </div>
      </SectionLayout>
    </main>
  );
}
