import type { SnomedConcept } from "@/types/snomed";

type SelectedConceptDisplayProps = Readonly<{
  concept: SnomedConcept | null;
}>;

export function SelectedConceptDisplay({
  concept,
}: SelectedConceptDisplayProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">
        Selected concept
      </h2>

      <div className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
        {concept ? (
          <p className="break-words font-mono text-sm text-slate-900">
            {concept.id} |{concept.term}|
          </p>
        ) : (
          <p className="text-sm text-slate-500">No concept selected yet.</p>
        )}
      </div>
    </section>
  );
}
