import React from "react";
import PokemonCard from "./PokemonCard";

export default function Pokedex({ pokemonList, caught, toggleCaught, selectedGames }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {pokemonList.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          caught={caught.includes(p.id)}
          toggleCaught={toggleCaught}
          selectedGames={selectedGames}
        />
      ))}
    </div>
  );
}
