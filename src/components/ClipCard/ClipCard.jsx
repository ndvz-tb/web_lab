import React from 'react';
import './ClipCard.css';

const ClipCard = ({ clip }) => {
  const { id, songTitle, artistName, duration, views } = clip;

  return (
    <div className="card" data-id={id}>
      <h3>{songTitle}</h3>
      <div className="artist">{artistName}</div>
      <div className="info">Тривалість: {duration} сек.</div>
      <div className="info">Переглядів: {views}</div>
      <div className="card-actions">
        <button type="button" className="edit-btn" data-id={id}>
          Редагувати
        </button>
        <button type="button" className="delete-btn" data-id={id}>
          Видалити
        </button>
      </div>
    </div>
  );
};

export default ClipCard;
