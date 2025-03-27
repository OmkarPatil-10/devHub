import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import JoinChallenge from "../components/JoinChallenge";
import CreateChallenge from "../components/CreateChallenge";
import HelpCenter from "../components/HelpCenter";

const UserDashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "JoinChallenge":
        return <JoinChallenge />;
      case "CreateChallenge":
        return <CreateChallenge />;
      case "HelpCenter":
        return <HelpCenter />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActivePage={setActivePage}  className="sticky bottom-0 top-0"/>
      <div className="flex-1 bg-gray-100 min-h-screen">{renderPage()}</div>
    </div>
  );
};

export default UserDashboard;
