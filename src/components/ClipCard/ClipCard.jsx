import React from 'react';
import PrimaryButton from '../ui/PrimaryButton/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton/SecondaryButton';
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
        <PrimaryButton className="edit-btn">View more</PrimaryButton>
        <SecondaryButton className="delete-btn">Видалити</SecondaryButton>
      </div>
    </div>
  );
};

export default ClipCard;
