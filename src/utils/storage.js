const STORAGE_KEYS = {
  FAVORITES: 'crypto_favorites',
  SETTINGS: 'crypto_settings',
};

/**
 * Salva dados no localStorage
 * @param {string} key - Chave do storage
 * @param {any} data - Dados a serem salvos
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
};

/**
 * Carrega dados do localStorage
 * @param {string} key - Chave do storage
 * @param {any} defaultValue - Valor padrão se não encontrar
 * @returns {any} Dados carregados
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove dados do localStorage
 * @param {string} key - Chave do storage
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Erro ao remover do localStorage:', error);
  }
};

export { STORAGE_KEYS };
