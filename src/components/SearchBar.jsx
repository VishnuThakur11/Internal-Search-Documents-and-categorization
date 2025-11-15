// SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    // 🔐 Check login
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      alert('you are logged out! Please login again')
      return;
    }

    // OPTIONAL: navigate to search results page
    // navigate(`/search?q=${query}`);
    
    console.log("Search:", query);
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex justify-center mt-6"
    >
      <div className="w-full md:w-2/3 lg:w-1/2">
        <div className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-full shadow-md">
          <input
            type="text"
            placeholder="Search your documents, campaigns, assets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-black placeholder-gray-500"
          />

          <button
            type="submit"
            className="px-5 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition"
          >
            Search
          </button>
        </div>
      </div>
    </motion.form>
  );
}