import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../ui/PrimaryButton/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton/SecondaryButton';
import { useClips } from '../../context/ClipsContext';
import './ClipCard.css';

const ClipCard = ({ clip, showRemove = true, withLink = true }) => {
  const { removeClip } = useClips();
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
        <p className="card__desc">{description}</p>
        <p className="card__specs">
          <strong>Виконавець:</strong> {artistName}
          <br />
          <strong>Тривалість:</strong> {duration} сек. | <strong>Перегляди:</strong> {Number(views).toLocaleString('uk-UA')}
        </p>
        <div className="card__updated">Last updated 3 mins ago</div>

        <div className="card__actions">
          {withLink ? (
            <Link to={`/item/${id}`} className="card__link">
              <PrimaryButton className="btn-card-edit">View more</PrimaryButton>
            </Link>
          ) : (
            <PrimaryButton className="btn-card-edit">View more</PrimaryButton>
          )}

          {showRemove && (
            <SecondaryButton
              className="btn-card-remove"
              onClick={() => removeClip(id)}
            >
              Remove
            </SecondaryButton>
          )}
        </div>
      </div>
    </article>
  );
};

export default ClipCard;
