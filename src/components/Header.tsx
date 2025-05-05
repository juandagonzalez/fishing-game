import { useState } from "preact/hooks";

interface HeaderProps {
  setPage: (page: "leaderboard" | "market") => void;
}

const Header = ({ setPage }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (page: "leaderboard" | "market") => {
    setPage(page);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
        <h1 className="text-2xl font-extrabold text-white tracking-wide">
          🌌 Galactic Fishing
        </h1>

        <nav className="hidden md:flex space-x-3">
          <button
            onClick={() => goTo("leaderboard")}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-40 transition"
          >
            Leaderboard
          </button>
          <button
            onClick={() => goTo("market")}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-40 transition"
          >
            Market
          </button>
        </nav>

        <button
          className="md:hidden flex flex-col justify-between w-6 h-6"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 bg-white transform transition duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 bg-white transform transition duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col mt-12 space-y-4 px-4">
          <button
            onClick={() => goTo("leaderboard")}
            className="text-gray-800 font-medium text-lg hover:text-blue-600 transition"
          >
            Leaderboard
          </button>
          <button
            onClick={() => goTo("market")}
            className="text-gray-800 font-medium text-lg hover:text-blue-600 transition"
          >
            Market
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Header;
