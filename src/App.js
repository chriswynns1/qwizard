import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";
import Navbar from "./Navbar";
import Play from "./Play";
import Footer from "./Footer";
import SignUp from "./SignUp";
import Login from "./Login";
import Category from "./Category";
import CardTest from "./CardTest";

const App = () => {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-sky-600 min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/play/:categoryId" element={<Play />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<CardTest />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
      </Router>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
