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
        <div className="card">
          <h3>Кліп не знайдено</h3>
          <div className="card-actions">
            <Link to="/catalog" className="card-link">
              <PrimaryButton>Back to Catalog</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="item-container">
      <div className="card">
        <h2>{clip.songTitle}</h2>
        <div className="artist">Виконавець: {clip.artistName}</div>
        <p className="item-desc">{clip.description}</p>
        <div className="info"><strong>Жанр:</strong> {clip.genre}</div>
        <div className="info"><strong>Тривалість:</strong> {clip.duration} сек.</div>
        <div className="info"><strong>Переглядів:</strong> {clip.views}</div>
        <div className="card-actions">
          <Link to="/catalog" className="card-link">
            <PrimaryButton className="edit-btn">Back to Catalog</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
