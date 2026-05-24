import { Fragment, type ReactNode } from "react";

export function highlightMatch(text: string, searchTerm: string): ReactNode {
  const tokens = searchTerm.trim().split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return text;
  }

  const escapedTokens = tokens.map(escapeRegExp);
  const regex = new RegExp(`(${escapedTokens.join("|")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isMatch = tokens.some(
      (token) => token.toLowerCase() === part.toLowerCase(),
    );

    return (
      <Fragment key={`${index}-${part}`}>
        {isMatch ? (
          <strong className="font-semibold text-slate-950">{part}</strong>
        ) : (
          part
        )}
      </Fragment>
    );
  });
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
