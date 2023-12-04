import "./Styles.css";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Navbar from "./Navbar";
import Play from "./Play";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./Login";
import Login from "./Login";
import Category from "./Category";
import CardTest from "./CardTest";

function App() {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-sky-600 min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/play/:categoryId" element={<Play />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<CardTest />} />
        </Routes>
      </Router>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
