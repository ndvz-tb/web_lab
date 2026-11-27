import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClipById } from '../../api/clipsApi';
import PrimaryButton from '../../components/ui/PrimaryButton/PrimaryButton';
import Loader from '../../components/ui/Loader/Loader';
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const [clip, setClip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;

    const loadClip = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getClipById(id);
        if (!isCancelled) {
          setClip(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setClip(null);
          setError('Кліп не знайдено');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadClip();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="item-container">
        <Loader text="Завантаження деталей кліпу..." />
      </div>
    );
  }

  if (!clip || error) {
    return (
      <div className="item-container">
        <article className="card">
          <div className="card__body">
            <h2 className="card__title">{error || 'Кліп не знайдено'}</h2>
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
            <strong>Тривалість:</strong> {clip.duration} сек. | <strong>Перегляди:</strong>{' '}
            {Number(clip.views).toLocaleString('uk-UA')}
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
