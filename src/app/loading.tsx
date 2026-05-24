export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div
          aria-hidden="true"
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700"
        />

        <output className="mt-4 block text-sm font-medium text-slate-700">
          Loading SNOMED CT Quick Search...
        </output>
      </div>
    </main>
  );
}
