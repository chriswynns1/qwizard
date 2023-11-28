import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignUp from "./SignUp";

function App() {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-sky-600 min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
