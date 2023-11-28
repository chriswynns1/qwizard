import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Footer from "./Footer";

function App() {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-sky-600 min-h-screen">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
