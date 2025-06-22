import React, { useState } from "react";

export default function PokemonCard({ pokemon, caught, toggleCaught, selectedGames }) {
  const [showLocations, setShowLocations] = useState(false);

  const filteredLocations = pokemon.locations.filter((loc) =>
    selectedGames.length === 0 ||
    loc.versions.some((v) => selectedGames.includes(v.version))
  );

  return (
    <div
      onClick={() => toggleCaught(pokemon.id)}
      className={`border rounded-xl p-4 cursor-pointer flex flex-col items-center ${
        caught ? "bg-green-200" : "bg-red-100"
      } hover:scale-105 transition-transform shadow-md`}
    >
      <p className="text-center capitalize font-bold text-xs">#{pokemon.id}</p>
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto"
      />
      <p className="text-center capitalize font-bold">{pokemon.name}</p>

      {filteredLocations.length > 0 ? (
        <div className="mt-2 text-sm">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
            onClick={(e) => {
              e.stopPropagation();
              setShowLocations(!showLocations);
            }}
          >
            {showLocations ? "Hide Locations" : "Show Locations"}
          </button>
          {showLocations && (
            <ul className="mt-2 list-disc ml-4">
              {filteredLocations.map((loc, idx) =>
                loc.versions
                  .filter((v) => selectedGames.length === 0 || selectedGames.includes(v.version))
                  .sort((a, b) => a.version - b.version)
                  .map((v, i) => (
                    <li key={`${idx}-${i}`} className="capitalize">
                      {loc.location} ({v.version}) - {v.method}, {v.chance}%
                    </li>
                  ))
              )}
            </ul>
          )}
        </div>
      ) : (
        <p className="text-xs mt-2 text-center">No locations in selected games</p>
      )}
    </div>
  );
}
