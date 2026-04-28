import { useMatches } from "react-router-dom";

export function useTitlePage() {
  const matches = useMatches();
  const currentMatch = [...matches]
    .reverse()
    .find((match) => match.handle?.title);

  return {
    titlePage: currentMatch?.handle?.title || "Unknown Page",
    description: currentMatch?.handle?.description || "Unknown",
  };
}
