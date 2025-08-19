import React, { useState, useEffect } from 'react';
import Header from './components/ui/Header';
import CryptoCard from './components/crypto/CryptoCard';
import CryptoFilters from './components/crypto/CryptoFilters';
import PriceChart from './components/charts/PriceChart';
import { cryptoService } from './services/cryptoApi';
import { useFavorites } from './hooks/useFavorites';
import { formatMarketCap } from './utils/formatters';
import { SORT_ORDERS } from './constants/sorting';
import { Star, X } from 'lucide-react';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState(SORT_ORDERS.DESC);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    loadCryptos();
  }, []);

  const loadCryptos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Carregar apenas moedas populares disponíveis
      const data = await cryptoService.getPopularCryptos();
      setCryptos(data);
      setFilteredCryptos(data);
    } catch (err) {
      setError('Erro ao carregar dados das criptomoedas');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...cryptos];

    if (searchQuery) {
      filtered = filtered.filter(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showFavorites) {
      filtered = filtered.filter(crypto => favorites.some(fav => fav.id === crypto.id));
    }

    filtered.sort((a, b) => {
      let aValue = a[sortBy] || 0;
      let bValue = b[sortBy] || 0;

      if (sortOrder === SORT_ORDERS.ASC) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCryptos(filtered);
  }, [cryptos, searchQuery, sortBy, sortOrder, showFavorites, favorites]);

  const handleSortChange = (newSortBy) => setSortBy(newSortBy);
  const handleSortOrderChange = () => setSortOrder(sortOrder === SORT_ORDERS.ASC ? SORT_ORDERS.DESC : SORT_ORDERS.ASC);
  const handleToggleShowFavorites = () => setShowFavorites(!showFavorites);
  const handleSelectCrypto = (crypto) => {
    setSelectedCrypto(crypto);
  };
  const handleCloseChart = () => setSelectedCrypto(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-white">Carregando criptomoedas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={loadCryptos} className="btn btn-primary">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFavorites={showFavorites}
        onToggleFavorites={handleToggleShowFavorites}
      />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <h3 className="text-gray-400 text-sm mb-2">Total Market Cap</h3>
              <p className="text-2xl font-bold text-white">
                {formatMarketCap(cryptos.reduce((sum, crypto) => sum + (crypto.market_cap || 0), 0))}
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-gray-400 text-sm mb-2">24h Volume</h3>
              <p className="text-2xl font-bold text-white">
                {formatMarketCap(cryptos.reduce((sum, crypto) => sum + (crypto.total_volume || 0), 0))}
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-gray-400 text-sm mb-2">Favoritos</h3>
              <p className="text-2xl font-bold text-yellow-400">{favorites.length}</p>
            </div>
            <div className="card text-center">
              <h3 className="text-gray-400 text-sm mb-2">Criptomoedas</h3>
              <p className="text-2xl font-bold text-white">{cryptos.length}</p>
            </div>
          </div>
        </div>

        <CryptoFilters
          sortBy={sortBy}
          onSortChange={handleSortChange}
          sortOrder={sortOrder}
          onSortOrderChange={handleSortOrderChange}
          showFavorites={showFavorites}
          onToggleShowFavorites={handleToggleShowFavorites}
        />

        <div className="space-y-4">
          {filteredCryptos.length === 0 ? (
            <div className="card text-center py-12">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {showFavorites ? 'Nenhum favorito encontrado' : 'Nenhuma criptomoeda encontrada'}
              </h3>
              <p className="text-gray-400">
                {showFavorites 
                  ? 'Adicione algumas criptomoedas aos seus favoritos para vê-las aqui.'
                  : 'Tente ajustar seus filtros de busca.'
                }
              </p>
            </div>
          ) : (
            filteredCryptos.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                crypto={crypto}
                isFavorite={isFavorite(crypto.id)}
                onToggleFavorite={toggleFavorite}
                onSelectCrypto={handleSelectCrypto}
              />
            ))
          )}
        </div>

        {selectedCrypto && (
          <div className="modal-overlay modal-backdrop-enter-active">
            <div className="modal-content modal-transition-enter-active">
              <div className="modal-header">
                <div className="modal-title">
                  <img
                    src={selectedCrypto.image}
                    alt={selectedCrypto.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <h2 className="text-xl font-bold text-white">
                    {selectedCrypto.name} ({selectedCrypto.symbol.toUpperCase()})
                  </h2>
                </div>
                <button
                  onClick={handleCloseChart}
                  className="modal-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <PriceChart
                cryptoId={selectedCrypto.id}
                cryptoName={selectedCrypto.name}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
