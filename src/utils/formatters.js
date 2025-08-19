/**
 * Formata preço em formato de moeda
 * @param {number} price - Preço a ser formatado
 * @returns {string} Preço formatado
 */
export const formatPrice = (price) => {
  if (!price || isNaN(price)) return '$0.00';
  
  if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    }).format(price);
  }
};

/**
 * Formata market cap em formato abreviado
 * @param {number} marketCap - Market cap a ser formatado
 * @returns {string} Market cap formatado
 */
export const formatMarketCap = (marketCap) => {
  if (!marketCap || isNaN(marketCap)) return '$0';
  
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
};

/**
 * Formata volume em formato abreviado
 * @param {number} volume - Volume a ser formatado
 * @returns {string} Volume formatado
 */
export const formatVolume = (volume) => {
  if (!volume || isNaN(volume)) return '$0';
  
  if (volume >= 1e9) {
    return `$${(volume / 1e9).toFixed(2)}B`;
  } else if (volume >= 1e6) {
    return `$${(volume / 1e6).toFixed(2)}M`;
  } else {
    return `$${volume.toLocaleString()}`;
  }
};

/**
 * Retorna a cor baseada na variação de preço
 * @param {number} change - Variação percentual
 * @returns {string} Classe CSS da cor
 */
export const getChangeColor = (change) => {
  if (!change || isNaN(change)) return 'text-gray-400';
  return change >= 0 ? 'text-green' : 'text-red';
};
