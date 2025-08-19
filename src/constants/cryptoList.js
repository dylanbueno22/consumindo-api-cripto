export const AVAILABLE_CRYPTOS = [
  'bitcoin',
  'ethereum',
  'tether',
  'binancecoin',
  'solana',
  'usd-coin',
  'cardano',
  'avalanche-2',
  'dogecoin',
  'chainlink',
  'matic-network',
  'internet-computer',
  'stellar',
  'monero',
  'aptos',
  'near',
  'hedera-hashgraph',
  'algorand',
  'tezos',
  'eos'
];

export const POPULAR_CRYPTOS = [
  'bitcoin',
  'ethereum',
  'tether',
  'binancecoin',
  'solana',
  'usd-coin',
  'cardano',
  'avalanche-2',
  'dogecoin',
  'chainlink',
  'matic-network',
  'internet-computer',
  'stellar',
  'monero',
  'aptos',
  'near',
  'hedera-hashgraph',
  'algorand',
  'tezos',
  'eos'
];



export const isCryptoAvailable = (cryptoId) => {
  return AVAILABLE_CRYPTOS.includes(cryptoId.toLowerCase());
};

export const filterAvailableCryptos = (cryptos) => {
  return cryptos.filter(crypto => isCryptoAvailable(crypto.id));
};
