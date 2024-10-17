import React from "react";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <UserList />
      </div>
    </div>
  );
};

export default HomePage;
