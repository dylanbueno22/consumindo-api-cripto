import React from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { SORT_OPTIONS, SORT_ORDERS } from '../../constants/sorting';
import '../../styles/components/crypto/CryptoFilters.css';

const CryptoFilters = ({ 
  sortBy, 
  onSortChange, 
  sortOrder, 
  onSortOrderChange,
  showFavorites,
  onToggleShowFavorites 
}) => {
  return (
    <div className="crypto-filters">
      <div className="filters-content">
        <div className="filters-left">
          <div className="filters-label">
            <Filter className="w-4 h-4" />
            <span>Filtros:</span>
          </div>

          <button
            onClick={onToggleShowFavorites}
            className={`favorites-filter-button ${showFavorites ? 'active' : ''}`}
          >
            Favoritos
          </button>
        </div>

        <div className="filters-right">
          <div className="sort-label">
            <span>Ordenar por:</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={onSortOrderChange}
            className="sort-order-button"
            title={sortOrder === SORT_ORDERS.ASC ? 'Crescente' : 'Decrescente'}
          >
            {sortOrder === SORT_ORDERS.ASC ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="filters-footer">
        <div className="active-filters">
          <span className="active-filters-label">Filtros ativos:</span>
          <span className="filter-tag">
            {SORT_OPTIONS.find(opt => opt.value === sortBy)?.label}
          </span>
          <span className="filter-tag">
            {sortOrder === SORT_ORDERS.ASC ? 'Crescente' : 'Decrescente'}
          </span>
          {showFavorites && (
            <span className="filter-tag favorites">
              Apenas Favoritos
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoFilters;
