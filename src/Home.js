import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Home() {
  const [user, setUser] = useState(null);

  // check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <div className="text-gray-100 pt-20">
        <div>
          <img
            class="h-auto max-w-xs mx-auto mt-5"
            src="https://cdn.discordapp.com/attachments/1164388242683080845/1178959853796995102/Quizard.png?ex=65780aed&is=656595ed&hm=93b30cd9f0c3a76fb90040236af0601d2d5d1837f6edb121dbee64ae798d708d&"
            alt="Quizard Logo"
          />
        </div>
        <div className="text-6xl text-center mt-5">Qwizard</div>
        <div className="text-center text-2xl pt-4">
          Become the next Qwizard champion!
        </div>
        {!user && (
          <div className="text-center text-1xl pt-4">
            Log in and play now or sign up for an account to save your high
            scores.
          </div>
        )}
        <div className="text-center pt-4">
          <a
            href="/category"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Play Now
            </span>
          </a>
          {!user && (
            <a
              href="/signup"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Sign Up
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
