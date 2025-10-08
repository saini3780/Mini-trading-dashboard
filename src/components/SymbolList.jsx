import React, { useState } from "react";

const SymbolList = ({ onSelectSymbol, onAddFavorite, favorites }) => {
  const forexSymbols = [
    "EUR/USD",
    "GBP/USD",
    "USD/JPY",
    "AUD/USD",
    "USD/CHF",
    "USD/CAD",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSymbols = forexSymbols.filter((symbol) =>
    symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card p-3" style={{ width: "280px" }}>
      <h4 className="mb-3 text-center">Forex Symbols</h4>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search symbol..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="list-group">
        {filteredSymbols.map((symbol) => (
          <li
            key={symbol}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{symbol}</span>
            <div>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => onSelectSymbol(symbol)}
              >
                Show
              </button>
              <button
                className={`btn btn-sm ${
                  favorites.includes(symbol)
                    ? "btn-warning"
                    : "btn-outline-warning"
                }`}
                onClick={() => onAddFavorite(symbol)}
              >
                ⭐
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymbolList;
