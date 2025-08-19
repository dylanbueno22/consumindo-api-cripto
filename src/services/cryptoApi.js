import axios from 'axios';
import { API_CONFIG, ALTERNATIVE_API_CONFIG, API_ENDPOINTS, DEFAULT_PARAMS } from '../constants/api';
import { POPULAR_CRYPTOS, filterAvailableCryptos } from '../constants/cryptoList';

const cryptoApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'x-cg-demo-api-key': API_CONFIG.API_KEY
  }
});

cryptoApi.interceptors.request.use(
  (config) => {
    config.headers['x-cg-demo-api-key'] = API_CONFIG.API_KEY;
    return config;
  },
  (error) => Promise.reject(error)
);

cryptoApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const cryptoService = {
  getCryptoList: async (page = 1, perPage = DEFAULT_PARAMS.PER_PAGE, currency = DEFAULT_PARAMS.CURRENCY) => {
    try {
      const response = await cryptoApi.get(API_ENDPOINTS.MARKETS, {
        params: {
          vs_currency: currency,
          order: DEFAULT_PARAMS.ORDER,
          per_page: perPage,
          page: page,
          sparkline: false,
          price_change_percentage: DEFAULT_PARAMS.PRICE_CHANGE_PERCENTAGE,
        },
      });
      
      const availableCryptos = filterAvailableCryptos(response.data);
      return availableCryptos;
    } catch (error) {
      console.error('Erro ao buscar lista de criptomoedas:', error);
      throw new Error('Falha ao carregar lista de criptomoedas');
    }
  },

  getCryptoDetails: async (id) => {
    try {
      const response = await cryptoApi.get(API_ENDPOINTS.COIN_DETAILS(id), {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes da criptomoeda:', error);
      throw new Error('Falha ao carregar detalhes da criptomoeda');
    }
  },

  getCryptoHistory: async (id, days = 7, currency = DEFAULT_PARAMS.CURRENCY) => {
    try {
      return await cryptoService.getCryptoHistoryFallback(id, days, currency);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error.message);
      throw new Error(`Falha ao carregar dados históricos: ${error.message}`);
    }
  },

  getCryptoHistoryFallback: async (id, days = 7) => {
    try {
      const generateMockData = (basePrice, volatility = 0.1) => {
        const prices = [];
        const now = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;
        
        for (let i = days; i >= 0; i--) {
          const timestamp = now - (i * dayMs);
          const randomChange = (Math.random() - 0.5) * volatility;
          const price = basePrice * (1 + randomChange);
          prices.push([timestamp, price]);
        }
        
        return prices;
      };

      const basePrices = {
        'bitcoin': 45000,
        'ethereum': 2800,
        'tether': 1,
        'binancecoin': 320,
        'solana': 95,
        'usd-coin': 1,
        'cardano': 0.45,
        'avalanche-2': 35,
        'dogecoin': 0.08,
        'chainlink': 15,
        'matic-network': 0.85,
        'internet-computer': 12,
        'stellar': 0.12,
        'monero': 165,
        'aptos': 8.5,
        'near': 5.2,
        'hedera-hashgraph': 0.075,
        'algorand': 0.18,
        'tezos': 0.95,
        'eos': 0.65
      };

      const basePrice = basePrices[id] || 100;
      const prices = generateMockData(basePrice, 0.15);
      
      return { prices };
    } catch (error) {
      console.error('Erro ao gerar dados mockados:', error);
      throw new Error(`Falha ao carregar dados: ${error.message}`);
    }
  },

  getMarketData: async () => {
    try {
      const response = await cryptoApi.get(API_ENDPOINTS.GLOBAL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados de mercado:', error);
      throw new Error('Falha ao carregar dados de mercado');
    }
  },

  searchCrypto: async (query) => {
    try {
      const response = await cryptoApi.get(API_ENDPOINTS.SEARCH, {
        params: { query },
      });
      
      const availableResults = filterAvailableCryptos(response.data.coins);
      return availableResults;
    } catch (error) {
      console.error('Erro ao buscar criptomoedas:', error);
      throw new Error('Falha ao buscar criptomoedas');
    }
  },

  getPopularCryptos: async (currency = DEFAULT_PARAMS.CURRENCY) => {
    try {
      const response = await cryptoApi.get(API_ENDPOINTS.MARKETS, {
        params: {
          vs_currency: currency,
          order: DEFAULT_PARAMS.ORDER,
          per_page: 100,
          page: 1,
          sparkline: false,
          price_change_percentage: DEFAULT_PARAMS.PRICE_CHANGE_PERCENTAGE,
        },
      });
      
      const allCryptos = response.data;
      const popularCryptos = allCryptos.filter(crypto => 
        POPULAR_CRYPTOS.includes(crypto.id)
      );
      
      const foundIds = popularCryptos.map(crypto => crypto.id);
      const missingIds = POPULAR_CRYPTOS.filter(id => !foundIds.includes(id));
      
      if (missingIds.length > 0) {
        console.warn('Moedas não encontradas no mercado:', missingIds);
      }
      
      const sortedPopularCryptos = POPULAR_CRYPTOS
        .map(id => popularCryptos.find(crypto => crypto.id === id))
        .filter(crypto => crypto !== undefined);
      
      return sortedPopularCryptos;
    } catch (error) {
      console.error('Erro ao buscar criptomoedas populares:', error);
      throw new Error('Falha ao carregar criptomoedas populares');
    }
  },
};

export default cryptoService;
