import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import search from "../assets/search.png";

const CreateChallenge = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/challenges/get", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          setChallenges(result);
        } else {
          console.error("Failed to fetch challenges:", result.message);
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {/* Search Bar and Create Button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search for Challenge..."
            className="flex-1 outline-none rounded-xl"
          />
          <button className="text-blue-600 text-xl ml-2">
            <img src={search} alt="search" className="w-8 h-8" />
          </button>
        </div>
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/create-new")}
        >
          + Create
        </button>
      </div>

      {/* Created Challenges Section */}
      <h2 className="text-xl font-bold mb-4">Your Created Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <div key={challenge._id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold">{challenge.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{challenge.description}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => navigate(`/kanban/${challenge._id}`)}
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p>No challenges found.</p>
        )}
      </div>
    </div>
  );
};

export default CreateChallenge;
