# SNOMED CT Quick Search Component

Technical assignment for **IQVIA / B2i Healthcare**.

A reusable SNOMED CT quick search component built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **TanStack Query**.

## Live Demo

[Vercel Demo](https://snomed-ct-quick-search.vercel.app/)

## Features

- Search SNOMED CT concepts by pressing **Enter**
- Search SNOMED CT concepts by clicking the **Search** button
- Display results in a dropdown below the input
- Configure the number of displayed results
- Store a single selected concept
- Display the selected concept in `ID |TERM|` format
- Highlight matching search term parts in bold
- Loading, empty, validation, and error states
- Close dropdown on outside click
- Server-side Snowray API integration
- API key is not exposed to the browser
- No UI component library

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- Biome

## Getting Started

Use the correct Node.js version:

```bash
nvm use
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
SNOWRAY_API_KEY=your_api_key_here
SNOWRAY_BASE_URL=https://demo.snowray.app/snowowl/snomedct/SNOMEDCT
```

Start the development server:

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm start
npm run check
npm run format
```

## Project Structure

```txt
src/
  app/
    api/
      snomed-search/
        route.ts
    globals.css
    layout.tsx
    loading.tsx
    page.tsx

  components/
    SectionLayout/
      SectionLayout.tsx
    SnomedQuickSearch/
      SearchResultsDropdown.tsx
      SelectedConceptDisplay.tsx
      SnomedQuickSearch.tsx

  constants/
    snomedSearch.ts

  hooks/
    useSnomedSearch.ts

  lib/
    snomed.ts

  providers/
    AppProviders.tsx

  types/
    snomed.ts

  utils/
    highlightMatch.tsx
```

## Implementation Notes

The browser does not call the external Snowray API directly. The frontend calls an internal Next.js API route instead:

```txt
/api/snomed-search
```

The API route calls Snowray on the server side and normalizes the response into a simple frontend-friendly shape:

```ts
{
  id: string;
  term: string;
}
```

This keeps the API key private and keeps the UI components clean.

Search results are handled as server state with TanStack Query. The query key includes both the submitted search term and the selected result limit:

```ts
["snomed-concepts", normalizedTerm, limit];
```

The input value and the submitted search value are stored separately, so requests are only triggered when the user presses Enter or clicks the Search button.

The selected concept is stored in the parent page component and passed to a separate display component, which renders it in the required format:

```txt
ID |TERM|
```

Matching text is highlighted with React elements instead of `dangerouslySetInnerHTML`.

## Deployment

The app is deployed on Vercel:

```txt
https://snomed-ct-quick-search.vercel.app/
```

For deployment, the following environment variables must be added in the Vercel project settings:

```env
SNOWRAY_API_KEY=your_api_key_here
SNOWRAY_BASE_URL=https://demo.snowray.app/snowowl/snomedct/SNOMEDCT
```

The API key must not be prefixed with `NEXT_PUBLIC_`, because it should remain server-side only.

## Summary

This solution focuses on clean component structure, type safety, secure API handling, and a smooth user experience while keeping the implementation simple and maintainable.
