import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useClips } from '../../context/ClipsContext';
import PrimaryButton from '../../components/ui/PrimaryButton/PrimaryButton';
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const { clips } = useClips();

  const clip = clips.find((item) => item.id === Number(id));

  if (!clip) {
    return (
      <div className="item-container">
        <article className="card">
          <div className="card__body">
            <h2 className="card__title">Кліп не знайдено</h2>
            <div className="card__actions">
              <Link to="/catalog" className="card__link">
                <PrimaryButton className="btn-card-edit">Back to Catalog</PrimaryButton>
              </Link>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="item-container">
      <article className="card">
        <div className="card__image item-image">
          <img
            src={clip.image || '/images/clip-default.jpg'}
            alt={clip.songTitle}
            className="card__img"
          />
        </div>

        <div className="card__body">
          <h1 className="card__title">{clip.songTitle}</h1>
          <p className="card__desc">{clip.description}</p>
          <p className="card__specs">
            <strong>Виконавець:</strong> {clip.artistName}
            <br />
            <strong>Жанр:</strong> {clip.genre}
            <br />
            <strong>Тривалість:</strong> {clip.duration} сек. | <strong>Перегляди:</strong> {Number(clip.views).toLocaleString('uk-UA')}
          </p>
          <div className="card__updated">Last updated 3 mins ago</div>

          <div className="card__actions">
            <Link to="/catalog" className="card__link">
              <PrimaryButton className="btn-card-edit">Back to Catalog</PrimaryButton>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ItemPage;
