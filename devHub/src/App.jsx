import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import CreateChallenge from "./components/CreateChallenge";
import CreateNewChallenge from "./components/CreateNewChallenge";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Create Challenge */}
        <Route path="/create-challenge" element={<CreateChallenge />} />

        {/* Create New Challenge */}
        <Route path="/create-new" element={<CreateNewChallenge />} />
      </Routes>
    </Router>
  );
};

export default App;
