// src/components/Market.tsx
import { useEffect, useState } from "preact/hooks";
import { Item } from "../types.ts";

const Market = () => {
  const [items, setItems] = useState<Item[]>([]);
  // same pattern as Leaderboard
  const API_BASE = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    fetch(`${API_BASE}/game/market`)
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .catch((err) => console.error("Failed to load market:", err));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4">
        <h2 className="text-white text-2xl font-semibold">💰 Market</h2>
      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-start p-6 hover:bg-gray-50 transition"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
            </div>

            <span className="ml-4 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              {item.cost} 🪙
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Market;
