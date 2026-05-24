import { type NextRequest, NextResponse } from "next/server";

import { MIN_SEARCH_LENGTH, RESULT_LIMIT } from "@/constants/snomedSearch";
import type { SnomedApiConcept, SnomedSearchApiResponse } from "@/types/snomed";

function normalizeLimit(value: string | null): number {
  const parsedLimit = Number(value ?? RESULT_LIMIT.DEFAULT);

  if (!Number.isFinite(parsedLimit)) {
    return RESULT_LIMIT.DEFAULT;
  }

  return Math.min(Math.max(parsedLimit, RESULT_LIMIT.MIN), RESULT_LIMIT.MAX);
}

function normalizeConcept(item: SnomedApiConcept) {
  return {
    id: item.id ?? item.conceptId ?? "",
    term: item.pt?.term ?? item.fsn?.term ?? "",
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const term = searchParams.get("term")?.trim() ?? "";
  const limit = normalizeLimit(searchParams.get("limit"));

  if (term.length < MIN_SEARCH_LENGTH) {
    return NextResponse.json({ concepts: [] });
  }

  const apiKey = process.env.SNOWRAY_API_KEY;
  const baseUrl =
    process.env.SNOWRAY_BASE_URL ??
    "https://demo.snowray.app/snowowl/snomedct/SNOMEDCT";

  if (!apiKey) {
    return NextResponse.json(
      { message: "Missing SNOWRAY_API_KEY environment variable." },
      { status: 500 },
    );
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const url = new URL(`${normalizedBaseUrl}/concepts`);

  url.searchParams.set("term", term);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("expand", "pt()");

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch SNOMED CT concepts." },
        { status: response.status },
      );
    }

    const data = (await response.json()) as SnomedSearchApiResponse;
    const items = Array.isArray(data.items) ? data.items : [];

    const concepts = items
      .map(normalizeConcept)
      .filter((concept) => concept.id && concept.term);

    return NextResponse.json({ concepts });
  } catch {
    return NextResponse.json(
      { message: "Unexpected error while searching SNOMED CT concepts." },
      { status: 500 },
    );
  }
}
