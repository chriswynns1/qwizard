import React, {useState} from "react";

function Navbar() {
  // use state to store if menu is open or not
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

 // when the menu is toggled, set it to the opposite of the current use state
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav class="fixed w-full z-20 top-0 start-0 backdrop-blur-lg border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a
          href="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://cdn.discordapp.com/attachments/1164388242683080845/1178959853796995102/Quizard.png?ex=65780aed&is=656595ed&hm=93b30cd9f0c3a76fb90040236af0601d2d5d1837f6edb121dbee64ae798d708d&"
            class="h-8"
            alt="Quizard Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Qwizard
          </span>
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <a
                href="/play"><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Play now!</button></a>
       <button
        data-collapse-toggle="navbar-sticky"
        type="button"
        onClick={toggleMobileMenu}
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-sticky"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
  </div>
  
  {/* checks to see if the isMobileMenu state is true - if it is, hide the mobile menu */}
  <div
        className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
          isMobileMenuOpen ? "" : "hidden"
        }`}
        id="navbar-sticky"
      >
    <div class="inline-flex rounded-md shadow-sm" role="group">
    <a
        href="/"><button type="button" class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-purple-900 to-indigo-900 border-t border-b border-gray-900 focus:z-10 focus:ring-2 dark:border-white">
    Home
  </button></a>
  <a
        href="/leaderboard"><button type="button" class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-purple-900 to-indigo-900 border-t border-b border-gray-900 focus:z-10 focus:ring-2 dark:border-white">
    Leaderboard
  </button></a>
  <a
        href="/profile"><button type="button" class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-purple-900 to-indigo-900 border-t border-b border-gray-900 focus:z-10 focus:ring-2 dark:border-white">
    Profile(?)
  </button></a>
</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
