import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getClips, createClip, deleteClip } from '../api/clipsApi';

const ClipsContext = createContext();

export const ClipsProvider = ({ children }) => {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadClips = useCallback(async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const data = await getClips(params);
      setClips(data);
      return data;
    } catch (err) {
      setError('Не вдалося завантажити кліпи з сервера.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadClips();
  }, [loadClips]);

  const addClip = async (data) => {
    const payload = {
      artistName: data.artistName,
      songTitle: data.songTitle,
      genre: data.genre || 'rock',
      duration: Number(data.duration),
      views: Number(data.views),
      description: data.description,
      image: data.image || '/images/clip-default.jpg'
    };
    const created = await createClip(payload);
    setClips((prev) => [...prev, created]);
    return created;
  };

  const removeClip = async (id) => {
    await deleteClip(id);
    setClips((prev) => prev.filter((item) => item.id !== Number(id)));
  };

  return (
    <ClipsContext.Provider
      value={{
        clips,
        setClips,
        loading,
        error,
        loadClips,
        addClip,
        removeClip
      }}
    >
      {children}
    </ClipsContext.Provider>
  );
};

export const useClips = () => useContext(ClipsContext);

export default ClipsContext;
