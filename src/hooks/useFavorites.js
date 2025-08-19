import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS, saveToStorage, loadFromStorage } from '../utils/storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = loadFromStorage(STORAGE_KEYS.FAVORITES, []);
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  const toggleFavorite = useCallback((crypto) => {
    setFavorites(prev => {
      const isFavorite = prev.find(fav => fav.id === crypto.id);
      if (isFavorite) {
        return prev.filter(fav => fav.id !== crypto.id);
      } else {
        return [...prev, crypto];
      }
    });
  }, []);

  const isFavorite = useCallback((cryptoId) => {
    return favorites.find(fav => fav.id === cryptoId) !== undefined;
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
