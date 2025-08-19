import React from 'react';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatMarketCap, formatVolume, getChangeColor } from '../../utils/formatters';

const CryptoCard = ({ crypto, isFavorite, onToggleFavorite, onSelectCrypto }) => {
  const getChangeIcon = (change) => {
    return change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const getChangeClass = (change) => {
    if (!change || isNaN(change)) return 'neutral';
    return change >= 0 ? 'positive' : 'negative';
  };

  return (
    <div 
      className="crypto-card"
      onClick={() => onSelectCrypto(crypto)}
    >
      <div className="crypto-card-content">
        <div className="crypto-card-left">
          <div className="crypto-info">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="crypto-image"
            />
            <div className="crypto-details">
              <h3>{crypto.name}</h3>
              <p>{crypto.symbol}</p>
            </div>
          </div>

          <div className="crypto-price">
            <p className="crypto-price-value">{formatPrice(crypto.current_price)}</p>
            <div className={`crypto-change ${getChangeClass(crypto.price_change_percentage_24h)}`}>
              {getChangeIcon(crypto.price_change_percentage_24h)}
              <span>{crypto.price_change_percentage_24h?.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="crypto-card-right">
          <div className="crypto-stat">
            <p className="crypto-stat-label">Market Cap</p>
            <p className="crypto-stat-value">{formatMarketCap(crypto.market_cap)}</p>
          </div>

          <div className="crypto-stat">
            <p className="crypto-stat-label">Volume</p>
            <p className="crypto-stat-value">{formatVolume(crypto.total_volume)}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(crypto);
            }}
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
          >
            <Star className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="crypto-card-footer">
        <div className="crypto-weekly-change">
          <span className="crypto-weekly-change-label">7d change:</span>
          <div className={`crypto-weekly-change-value ${getChangeClass(crypto.price_change_percentage_7d_in_currency)}`}>
            {getChangeIcon(crypto.price_change_percentage_7d_in_currency)}
            <span>{crypto.price_change_percentage_7d_in_currency?.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
