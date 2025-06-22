import React from "react";

export default function Filters({
  generations,
  selectedGenerations,
  setSelectedGenerations,
  games,
  selectedGames,
  setSelectedGames,
}) {
  const toggleGeneration = (url) => {
    setSelectedGenerations((prev) =>
      prev.includes(url) ? prev.filter((g) => g !== url) : [...prev, url]
    );
  };

  const toggleGame = (game) => {
    setSelectedGames((prev) =>
      prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game]
    );
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <h2 className="text-lg font-semibold">Select Generations:</h2>
        <div className="flex flex-wrap gap-2">
          {generations.map((gen) => (
            <button
              key={gen.name}
              onClick={() => toggleGeneration(gen.url)}
              className={`px-3 py-1 rounded-full border ${
                selectedGenerations.includes(gen.url)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {gen.name.replace("generation-", "Gen ").toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Select Games:</h2>
        <div className="flex flex-wrap gap-2">
          {games.map((game) => (
            <button
              key={game}
              onClick={() => toggleGame(game)}
              className={`px-3 py-1 rounded-full border ${
                selectedGames.includes(game)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {game.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
