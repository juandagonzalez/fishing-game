import { useState } from "preact/hooks";
import Leaderboard from "./components/Leaderboard.tsx";
import Market from "./components/Market.tsx";
import Header from "./components/Header.tsx";

const App = () => {
  const [page, setPage] = useState<"leaderboard" | "market">("leaderboard");

  return (
    <div className="bg-gray-900 text-white">
      <Header setPage={setPage} />
      {page === "leaderboard" ? <Leaderboard /> : <Market />}
    </div>
  );
};

export default App;
