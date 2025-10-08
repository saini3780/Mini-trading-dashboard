import React, { useState, useEffect } from "react";
import SymbolList from "./components/SymbolList";
import ChartPanel from "./components/ChatPanel";
import Favorites from "./components/Favouites";
import "./App.css";



function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when app starts
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add or remove favorite
  const handleAddFavorite = (symbol) => {
    if (favorites.includes(symbol)) {
      setFavorites(favorites.filter((s) => s !== symbol));
    } else {
      setFavorites([...favorites, symbol]);
    }
  };

  const handleRemoveFavorite = (symbol) => {
    setFavorites(favorites.filter((s) => s !== symbol));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <SymbolList
            onSelectSymbol={setSelectedSymbol}
            onAddFavorite={handleAddFavorite}
            favorites={favorites}
          />
          <Favorites
            favorites={favorites}
            onSelectSymbol={setSelectedSymbol}
            onRemoveFavorite={handleRemoveFavorite}
          />
        </div>
        <div className="col-md-8">
          <ChartPanel symbol={selectedSymbol} />
        </div>
      </div>
    </div>
  );
}

export default App;
