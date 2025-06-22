import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokedex from "./components/Pokedex";
import ProgressBar from "./components/ProgressBar";
import Filters from "./components/Filters";

export default function App() {
  const [generations, setGenerations] = useState([]);
  const [selectedGenerations, setSelectedGenerations] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [hideCaught, setHideCaught] = useState(false);

  const [pokemonList, setPokemonList] = useState([]);
  const [caught, setCaught] = useState(() => {
    const saved = localStorage.getItem("caught");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchGenerations = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/generation/");
      setGenerations(res.data.results);
    };
    fetchGenerations();
  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (selectedGenerations.length === 0) {
        setPokemonList([]);
        return;
      }

      const pokeData = await Promise.all(
        selectedGenerations.map(async (genUrl) => {
          const res = await axios.get(genUrl);
          return res.data.pokemon_species;
        })
      );

      const flatList = pokeData.flat();

      const detailed = await Promise.all(
        flatList.map(async (p) => {
          const id = p.url.split("/").filter(Boolean).pop();
          const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

          const encountersRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`);
          const locations = encountersRes.data.map((loc) => ({
            location: loc.location_area.name.replace(/-/g, ' '),
            versions: loc.version_details.map((v) => ({
              version: v.version.name,
              method: v.encounter_details[0]?.method.name ?? 'unknown',
              chance: v.encounter_details[0]?.chance ?? 'unknown'
            }))
          }));

          locations.flatMap(l => l.versions.map(v => v.version)).forEach(v => {
            if (!games.includes(v)) setGames(prev => [...new Set([...prev, v])]);
          });

          return {
            id: details.data.id,
            name: details.data.name,
            sprite: details.data.sprites.front_default,
            locations: locations,
          };
        })
      );

      const sorted = detailed.sort((a, b) => a.id - b.id);
      setPokemonList(sorted);
    };

    fetchPokemon();
  }, [selectedGenerations]);

  useEffect(() => {
    localStorage.setItem("caught", JSON.stringify(caught));
  }, [caught]);

  const toggleCaught = (id) => {
    setCaught((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const filteredPokemonList = hideCaught
    ? pokemonList.filter((p) => !caught.includes(p.id))
    : pokemonList;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Pokédex Tracker</h1>
      <div className="mb-4 flex items-center gap-4">
        <Filters
          generations={generations}
          selectedGenerations={selectedGenerations}
          setSelectedGenerations={setSelectedGenerations}
          games={games}
          selectedGames={selectedGames}
          setSelectedGames={setSelectedGames}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hideCaught}
            onChange={() => setHideCaught(!hideCaught)}
          />
          Hide Caught
        </label>
      </div>
      <ProgressBar total={pokemonList.length} caught={caught.length} />
      <Pokedex
        pokemonList={filteredPokemonList}
        caught={caught}
        toggleCaught={toggleCaught}
        selectedGames={selectedGames}
      />
    </div>
  );
}
