import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart
} from '../../redux/actions';
import PrimaryButton from '../../components/ui/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/ui/SecondaryButton/SecondaryButton';
import './Cart.css';

const formatDuration = (totalSeconds) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const Cart = () => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalDuration = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.duration || 0) * item.quantity, 0);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h1 className="cart-empty__title">Кошик порожній</h1>
          <p className="cart-empty__desc">
            Ви ще не додали жодного кліпу. Перейдіть до каталогу, оберіть кліп та натисніть «Add to Cart».
          </p>
          <Link to="/catalog">
            <PrimaryButton className="cart-empty__btn">Перейти до каталогу</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div>
          <h1 className="cart-title">Кошик кліпів</h1>
          <p className="cart-subtitle">Усього обрано позицій: {totalCount}</p>
        </div>
        <SecondaryButton className="cart-clear-btn" onClick={() => dispatch(clearCart())}>
          Очистити кошик
        </SecondaryButton>
      </div>

      <div className="cart-list">
        {items.map((item) => (
          <article key={item.id} className="cart-item" data-id={item.id}>
            <Link to={`/item/${item.id}`} className="cart-item__media">
              <img
                src={item.image || '/images/clip-default.jpg'}
                alt={item.songTitle}
                className="cart-item__img"
              />
            </Link>

            <div className="cart-item__info">
              <Link to={`/item/${item.id}`} className="cart-item__title">
                {item.songTitle}
              </Link>
              <p className="cart-item__artist">
                {item.artistName} • <span className="cart-item__genre">{item.genre}</span>
              </p>
              <p className="cart-item__meta">
                Тривалість: {item.duration} сек. | Перегляди:{' '}
                {Number(item.views || 0).toLocaleString('uk-UA')}
              </p>
            </div>

            <div className="cart-item__controls">
              <div className="cart-qty">
                <button
                  type="button"
                  className="cart-qty__btn"
                  aria-label="Зменшити кількість"
                  onClick={() => dispatch(decrementQuantity(item.id))}
                >
                  −
                </button>
                <span className="cart-qty__value">{item.quantity}</span>
                <button
                  type="button"
                  className="cart-qty__btn"
                  aria-label="Збільшити кількість"
                  onClick={() => dispatch(incrementQuantity(item.id))}
                >
                  +
                </button>
              </div>

              <div className="cart-item__subtotal">
                {Number(item.duration || 0) * item.quantity} сек.
              </div>

              <SecondaryButton
                className="cart-item__remove"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Видалити
              </SecondaryButton>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary__stats">
          <div className="cart-summary__row">
            <span>Кількість кліпів:</span>
            <strong>{totalCount} шт.</strong>
          </div>
          <div className="cart-summary__row">
            <span>Загальна тривалість:</span>
            <strong>
              {totalDuration} сек. ({formatDuration(totalDuration)})
            </strong>
          </div>
        </div>

        <div className="cart-summary__actions">
          <Link to="/catalog">
            <SecondaryButton className="cart-summary__back">
              Повернутися до каталогу
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
