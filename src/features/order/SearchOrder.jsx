import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        placeholder="Cari order #"
        onChange={(e) => setQuery(e.target.value)}
        className="bg-yellow-200 rounded-full px-4 py-2 placeholder:text-stone-600 focus:outline-none focus:ring focus:ring-yellow-300 sm:w-56 sm:focus:w-72 transition-all duration-300"
      />
    </form>
  );
}
