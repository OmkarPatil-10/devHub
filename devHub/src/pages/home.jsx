import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">Collaborate & Code Together</h1>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-4 px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
