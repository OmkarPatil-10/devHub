const CreateNewChallenge = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Create a Challenge</h2>
          
          <form>
            {/* Title Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter challenge title"
              />
            </div>
  
            {/* Description Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="3"
                placeholder="Enter challenge description"
              />
            </div>
  
            {/* Requirement Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Requirement</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter challenge requirements"
              />
            </div>
  
            {/* Experience Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Experience</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter experience level"
              />
            </div>
  
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Create Challenge
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default CreateNewChallenge;
  