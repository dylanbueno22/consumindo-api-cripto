import React from 'react';
import { Search, Star } from 'lucide-react';

const Header = ({ activeTab, onTabChange, searchQuery, onSearchChange, showFavorites, onToggleFavorites }) => {
  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'trade', label: 'Trade' },
    { id: 'market', label: 'Market' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-logo">
              CryptoTrader
            </h1>
            
            <nav className="header-nav">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="header-right">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar criptomoedas..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
            </div>

            <button
              onClick={onToggleFavorites}
              className={`favorites-button ${showFavorites ? 'active' : ''}`}
              title="Mostrar/Ocultar Favoritos"
            >
              <Star className="w-5 h-5" fill={showFavorites ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
