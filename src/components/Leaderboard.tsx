// src/components/Leaderboard.tsx
import { useEffect, useState } from "preact/hooks";
import { Player } from "../types.ts";

const Leaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const API_BASE = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    fetch(`${API_BASE}/game/leaderboard`)
      .then((res) => res.json())
      .then((data) => setPlayers(data.players))
      .catch((err) => console.error("Failed to load leaderboard:", err));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
        <h2 className="text-white text-2xl font-semibold">🏆 Leaderboard</h2>
      </div>

      <ul className="divide-y divide-gray-200">
        {players.map((player) => (
          <li
            key={player.rank}
            className="flex flex-col md:flex-row md:justify-between p-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg font-medium text-gray-700">
                {player.rank}.
              </span>
              <span className="font-semibold text-gray-900">
                {player.username}
              </span>
            </div>

            <div className="mt-2 md:mt-0 flex flex-wrap items-center space-x-2 text-sm">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                Lvl {player.level}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                🥇 {player.gold}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                🌟 {player.xp}
              </span>
              {player.isInfected && (
                <span
                  className="px-2 py-1 bg-red-100 text-red-600 rounded-full"
                  title="Infected"
                >
                  🍄 Infected
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
