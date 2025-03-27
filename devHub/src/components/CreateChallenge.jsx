import { useNavigate } from "react-router-dom";
import search from "../assets/search.png";
import searchLogo from "../assets/searchLogo.svg";

const CreateChallenge = () => {
  const navigate = useNavigate();

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
            <img src={searchLogo} alt="search" className="w-8 h-8" />
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
        {["Challenge 1", "Challenge 2", "Challenge 3"].map((challenge, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold">
              Transforming Cancer Navigation with Open Data & APIs
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Support care Navigators with digital tools that integrate openly available datasets
              and APIs. Enhance patient care and support systems.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateChallenge;
