
export const API_CONFIG = {
  BASE_URL: 'https://api.coingecko.com/api/v3',
  API_KEY: 'CG-eh1yPmoX3FDWagn1TKNkGA2V',
  TIMEOUT: 45000,
  RETRY_DELAY: 3000,
  MAX_RETRIES: 3,
};

export const ALTERNATIVE_API_CONFIG = {
  BASE_URL: 'https://api.coincap.io/v2',
  TIMEOUT: 30000,
  RETRY_DELAY: 2000,
  MAX_RETRIES: 2,
};

export const API_ENDPOINTS = {
  MARKETS: '/coins/markets',
  COIN_DETAILS: (id) => `/coins/${id}`,
  MARKET_CHART: (id) => `/coins/${id}/market_chart`,
  GLOBAL: '/global',
  SEARCH: '/search',
};

export const DEFAULT_PARAMS = {
  CURRENCY: 'usd',
  PER_PAGE: 100,
  ORDER: 'market_cap_desc',
  PRICE_CHANGE_PERCENTAGE: '24h,7d',
};
