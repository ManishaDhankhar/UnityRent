import { useState, useMemo, useEffect } from "react";
import Fuse from "fuse.js";

// Delays updating the value until user stops typing for `delay` ms
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // reset timer on every keystroke
  }, [value, delay]);

  return debounced;
}

// Main search hook — takes products array, returns query state + display list
function useSearch(products) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);

  // Rebuild Fuse instance only when products change
  const fuse = useMemo(() => {
    return new Fuse(products || [], {
      keys: [
        { name: "title", weight: 0.7 },
        { name: "category", weight: 0.3 },
      ],
      threshold: 0.4,
    });
  }, [products]);

  // Run search only after debounce settles
  const results = debouncedQuery ? fuse.search(debouncedQuery) : [];

  // If searching, show matches. Otherwise show everything.
  const displayItems = debouncedQuery
    ? results.map(({ item }) => item)
    : products || [];

  return { query, setQuery, displayItems };
}

export default useSearch;