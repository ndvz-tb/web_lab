import React from 'react';
import PrimaryButton from '../ui/PrimaryButton/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton/SecondaryButton';
import './ClipCard.css';

const ClipCard = ({ clip, showRemove = true }) => {
  const { id, songTitle, artistName, description, duration, views, image } = clip;

  return (
    <article className="card" data-id={id}>
      <div className="card__image">
        <img
          src={image || '/images/clip-default.jpg'}
          alt={songTitle}
          className="card__img"
        />
      </div>

      <div className="card__body">
        <h3 className="card__title">{songTitle}</h3>
        <div className="card__artist">{artistName}</div>
        <p className="card__desc">{description}</p>
        <p className="card__specs">
          <strong>Тривалість:</strong> {duration} сек.
          <br />
          <strong>Переглядів:</strong> {Number(views).toLocaleString('uk-UA')}
        </p>

        <div className="card__actions">
          <PrimaryButton className="btn-card-view">View more</PrimaryButton>
          {showRemove && (
            <SecondaryButton className="btn-card-remove">Remove</SecondaryButton>
          )}
        </div>
      </div>
    </article>
  );
};

export default ClipCard;
