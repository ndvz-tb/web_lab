import React, { createContext, useContext, useState } from 'react';
import { INITIAL_CLIPS } from '../data/clips';

const ClipsContext = createContext();

export const ClipsProvider = ({ children }) => {
  const [clips, setClips] = useState(INITIAL_CLIPS);

  const addClip = (data) => {
    const newItem = {
      id: Date.now(),
      artistName: data.artistName,
      songTitle: data.songTitle,
      genre: data.genre || 'rock',
      duration: Number(data.duration),
      views: Number(data.views),
      description: data.description
    };
    setClips([...clips, newItem]);
  };

  const removeClip = (id) => {
    setClips(clips.filter((item) => item.id !== Number(id)));
  };

  return (
    <ClipsContext.Provider
      value={{
        clips,
        setClips,
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
