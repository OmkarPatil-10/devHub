import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

const challenges = [
  { id: 1, author: "Omkar Patil", title: "Transforming Cancer Navigation with Open Data & APIs", description: "Support care Navigators with digital tools that integrate openly available datasets and APIs. Enhance patient care and support systems." },
  { id: 2, author: "Reshma Zore", title: "Transforming Cancer Navigation with Open Data & APIs", description: "Support care Navigators with digital tools that integrate openly available datasets and APIs. Enhance patient care and support systems." },
  { id: 3, author: "Divesh Prasad", title: "Transforming Cancer Navigation with Open Data & APIs", description: "Support care Navigators with digital tools that integrate openly available datasets and APIs. Enhance patient care and support systems." }
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ experience: "All", language: "All" });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ experience: "All", language: "All" });
    setSearchTerm("");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Search and Filters */}
      <div className="flex flex-col justify-center  gap-4 mb-6">
        <div className="relative w-3/4">
          <input
            type="text"
            placeholder="Search for Challenge....."
            className="w-full p-3 pl-10 border rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex gap-5">
          <select
            className="p-1 border border-blue-600 text-blue-600 rounded-md focus:outline-none"
            value={filters.experience}
            onChange={(e) => handleFilterChange("experience", e.target.value)}
          >
            <option>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select
            className="p-1 border border-blue-600 text-blue-600 rounded-md focus:outline-none"
            value={filters.language}
            onChange={(e) => handleFilterChange("language", e.target.value)}
          >
            <option>All</option>
            <option>JavaScript</option>
            <option>Python</option>
            <option>Java</option>
          </select>

          <button
            className="flex items-center px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={clearFilters}
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filter
          </button>
        </div>
      </div>

      {/* Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <p className="text-gray-600 mb-2">~ By {challenge.author}</p>
            <h3 className="text-xl font-bold mb-3">{challenge.title}</h3>
            <p className="text-gray-700 mb-4">{challenge.description}</p>
            <div className="flex justify-between">
              <button className="px-8 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-gray-100">View</button>
              <button className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
