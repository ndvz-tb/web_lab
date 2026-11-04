import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../ui/PrimaryButton/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton/SecondaryButton';
import { useClips } from '../../context/ClipsContext';
import './ClipCard.css';

const ClipCard = ({ clip }) => {
  const { removeClip } = useClips();
  const { id, songTitle, artistName, duration, views } = clip;

  return (
    <div className="card" data-id={id}>
      <h3>{songTitle}</h3>
      <div className="artist">{artistName}</div>
      <div className="info">Тривалість: {duration} сек.</div>
      <div className="info">Переглядів: {views}</div>
      <div className="card-actions">
        <Link to={`/item/${id}`} className="card-link">
          <PrimaryButton className="edit-btn">View more</PrimaryButton>
        </Link>
        <SecondaryButton
          className="delete-btn"
          onClick={() => removeClip(id)}
        >
          Видалити
        </SecondaryButton>
      </div>
    </div>
  );
};

export default ClipCard;
