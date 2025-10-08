import React from "react";

const Favorites = ({ favorites, onSelectSymbol, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="card p-3 mt-3">
        <h5>No favorites yet</h5>
        <p className="text-muted">Click the ⭐ icon on a symbol to save it.</p>
      </div>
    );
  }

  return (
    <div className="card p-3 mt-3">
      <h5>Favorites</h5>
      <ul className="list-group">
        {favorites.map((symbol) => (
          <li
            key={symbol}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              style={{ cursor: "pointer" }}
              onClick={() => onSelectSymbol(symbol)}
            >
              {symbol}
            </span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onRemoveFavorite(symbol)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
