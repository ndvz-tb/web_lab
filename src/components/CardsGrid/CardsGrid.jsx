import React from 'react';
import ClipCard from '../ClipCard/ClipCard';
import './CardsGrid.css';

const CardsGrid = ({ clips = [] }) => {
  return (
    <main className="content">
      <h2>Список кліпів</h2>
      <div id="clipsContainer" className="cards-container">
        {clips.length === 0 ? (
          <p>Кліпів не знайдено.</p>
        ) : (
          clips.map((clip) => (
            <ClipCard key={clip.id} clip={clip} />
          ))
        )}
      </div>
    </main>
  );
};

export default CardsGrid;
