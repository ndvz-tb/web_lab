import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClipById } from '../../api/clipsApi';
import { addToCart } from '../../redux/actions';
import PrimaryButton from '../../components/ui/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/ui/SecondaryButton/SecondaryButton';
import Loader from '../../components/ui/Loader/Loader';
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.items);

  const [clip, setClip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const itemInCart = clip ? cartItems.find((item) => item.id === clip.id) : null;

  const handleAddToCart = () => {
    if (!clip) return;
    dispatch(addToCart(clip));
    setAddedFeedback(true);
  };

  useEffect(() => {
    let isCancelled = false;

    const loadClip = async () => {
      setLoading(true);
      setError('');
      setAddedFeedback(false);
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

          {addedFeedback && itemInCart && (
            <div className="item-cart-notice">
              Додано до кошика! У кошику зараз: <strong>{itemInCart.quantity} шт.</strong>
            </div>
          )}

          <div className="card__actions item-actions">
            <PrimaryButton className="btn-card-edit" onClick={handleAddToCart}>
              Add to Cart {itemInCart ? `(${itemInCart.quantity})` : ''}
            </PrimaryButton>

            {itemInCart && (
              <Link to="/cart" className="card__link">
                <SecondaryButton>Go to Cart</SecondaryButton>
              </Link>
            )}

            <Link to="/catalog" className="card__link">
              <SecondaryButton>Back to Catalog</SecondaryButton>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ItemPage;
