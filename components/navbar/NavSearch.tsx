// "use client";
// import { Input } from "../ui/input";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
// import { useState, useEffect } from "react";

// function NavSearch() {
//   const searchParams = useSearchParams();
//   const { replace } = useRouter();
//   const [search, setSearch] = useState(
//     searchParams.get("search")?.toString() || ""
//   );
//   const handleSearch = useDebouncedCallback((value: string) => {
//     const params = new URLSearchParams(searchParams);
//     if (value) {
//       params.set("search", value);
//     } else {
//       params.delete("search");
//     }
//     replace(`/products?${params.toString()}`);
//   }, 500);

//   useEffect(() => {
//     if (!searchParams.get("search")) {
//       setSearch("");
//     }
//   }, [searchParams.get("search")]);
//   return (
//     <Input
//       type="search"
//       name="search"
//       placeholder="search product..."
//       className="max-w-xs dark:bg-muted"
//       onChange={(e) => {
//         setSearch(e.target.value);
//         handleSearch(e.target.value);
//       }}
//     />
//   );
// }

// export default NavSearch;

"use client";

import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

function NavSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Extract search term once
  const searchTerm = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchTerm);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/products?${params.toString()}`);
  }, 500);

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]); // Fix the dependency warning

  return (
    <Input
      type="search"
      name="search"
      placeholder="search product..."
      className="max-w-xs dark:bg-muted"
      value={search} // Control the input value
      onChange={(e) => {
        setSearch(e.target.value); // Update state
        handleSearch(e.target.value); // Trigger debounced search
      }}
    />
  );
}

export default NavSearch;
