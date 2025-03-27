// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./index.css";
// import Home from "./pages/home";
// import Login from "./pages/Login"; // Import Login component
// import UserDashboard from "./pages/UserDashboard";
// import CreateChallenge from "./components/CreateChallenge";
// import CreateNewChallenge from "./components/CreateNewChallenge";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Login Page */}
//         <Route path="/login" element={<Login />} />

//         {/* Home Page */}
//         <Route path="/" element={<Home />} />

//         {/* Dashboard */}
//         <Route path="/dashboard" element={<UserDashboard />} />

//         {/* Create Challenge */}
//         <Route path="/create-challenge" element={<CreateChallenge />} />

//         {/* Create New Challenge */}
//         <Route path="/create-new" element={<CreateNewChallenge />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// Pages and Components
import Home from "./pages/home";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import Signup from "./pages/Signup";
import CreateChallenge from "./components/CreateChallenge";
import CreateNewChallenge from "./components/CreateNewChallenge";
import KanbanBoard from "./pages/KanbanBoard";
import EditProfile from "./components/EditProfile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated based on the token
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth); // Listen for manual updates
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/create-challenge"
          element={isAuthenticated ? <CreateChallenge /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-new"
          element={isAuthenticated ? <CreateNewChallenge /> : <Navigate to="/login" />}
        />
        {/* Kanban Board Route */}
        <Route 
          path="/kanban/:id" 
          element={
            isAuthenticated? (
              <KanbanBoard    teamId="67e3daa49f4be63e4f0ed655" />
            ) : (
              <Navigate to="/dashboard"  id="67e53c7945a30e4c4a48117d"/>
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
