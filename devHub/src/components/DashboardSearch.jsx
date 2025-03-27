import React, { useState } from "react";
import axios from "axios";

const DashboardSearch = () => {
  const [filters, setFilters] = useState({
    techStack: "",
    experience: "",
    availability: "",
    collaboration: "",
  });

  const [developers, setDevelopers] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/search", {
        params: filters,
      });
      setDevelopers(res.data);
    } catch (error) {
      console.error("Error fetching developers", error);
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleConnect = () => {
    alert("Sending connection requests to: " + selected.join(", "));
    // TODO: Connect logic goes here
  };

  return (
    <div className="p-4">
      {/* search bar */}
      <input
        type="text"
        placeholder="Search for developers..." // Search for developers
        name="search" // search
        onChange={handleFilterChange}
        className="border rounded-4xl p-2 pl-10 mb-4 w-3/4"
      />

      {/* Filters */}
      <div className="flex gap-3 flex-wrap mb-5">
        <select
          name="techStack"
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Tech Stack</option>
          <option>React</option>
          <option>Node</option>
          <option>Python</option>
          <option>Java</option>
        </select>

        <select
          name="experience"
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Experience Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <select
          name="availability"
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Availability</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Weekends</option>
        </select>

        <select
          name="collaboration"
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Collaboration Type</option>
          <option>Pair Programming</option>
          <option>Hackathon</option>
          <option>Open Source</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Search
        </button>
      </div>

      {/* Developer List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {developers.map((dev) => (
          <div
            key={dev._id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{dev.name}</h3>
              <p>
                {dev.techStack} | {dev.experience} | {dev.availability} |{" "}
                {dev.collaboration}
              </p>
            </div>
            <input
              type="checkbox"
              checked={selected.includes(dev._id)}
              onChange={() => toggleSelect(dev._id)}
            />
          </div>
        ))}
      </div>

      {/* Connect */}
      {selected.length > 0 && (
        <button
          onClick={handleConnect}
          className="mt-4 bg-green-500 text-white rounded px-4 py-2"
        >
          Connect with {selected.length} developer(s)
        </button>
      )}
    </div>
  );
};

export default DashboardSearch;