import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClipCard from '../../components/ClipCard/ClipCard';
import PrimaryButton from '../../components/ui/PrimaryButton/PrimaryButton';
import { useClips } from '../../context/ClipsContext';
import './Home.css';

const Home = () => {
  const { clips } = useClips();
  const [showMore, setShowMore] = useState(false);
  const [stripIndex, setStripIndex] = useState(0);

  const displayedClips = showMore ? clips : clips.slice(0, 3);

  const stripVisibleCount = 4;
  const maxStripIndex = Math.max(0, clips.length - stripVisibleCount);

  const handlePrevStrip = () => {
    setStripIndex((prev) => (prev > 0 ? prev - 1 : maxStripIndex));
  };

  const handleNextStrip = () => {
    setStripIndex((prev) => (prev < maxStripIndex ? prev + 1 : 0));
  };

  const visibleStripItems = clips.slice(
    stripIndex,
    stripIndex + stripVisibleCount
  );

  const handleScrollToFeatured = () => {
    const section = document.getElementById('you-may-like');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <h1 className="home-hero__title">
            Admire Classic Music &amp; Clips
          </h1>
          <p className="home-hero__desc">
            Культові музичні відеокліпи різних епох і жанрів — від світової
            рок-класики до українських хітів. Обирайте улюблені композиції.
          </p>
          <div className="home-hero__actions">
            <PrimaryButton
              className="home-hero__btn"
              onClick={handleScrollToFeatured}
            >
              Show More
            </PrimaryButton>
          </div>
        </div>

        <div className="home-hero__visual">
          <img
            src="/images/hero.jpg"
            alt="Music Studio"
            className="home-hero__img"
          />
        </div>
      </section>

      <section className="home-categories">
        <div className="category-card category-card--large">
          <div className="category-card__top">
            <div className="category-card__badge">Popular • Rock</div>
            <h2 className="category-card__title">Рок та гранж легенди</h2>
            <p className="category-card__models">
              Queen • Nirvana • Linkin Park
            </p>
            <p className="category-card__desc">
              Класичні відеокліпи та культові гітарні рифи світової сцени.
            </p>
          </div>
          <div className="category-card__media">
            <img src="/images/rock.jpg" alt="Рок та гранж" />
          </div>
        </div>

        <div className="category-column">
          <div className="category-card category-card--horizontal">
            <div className="category-card__info">
              <div className="category-card__badge">Pop</div>
              <h3 className="category-card__title">Поп та синті-хіти</h3>
              <p className="category-card__models">
                Michael Jackson • The Weeknd
              </p>
              <p className="category-card__desc">
                Яскраві відеокліпи з мільярдами переглядів.
              </p>
            </div>
            <div className="category-card__media category-card__media--small">
              <img src="/images/pop.jpg" alt="Поп музика" />
            </div>
          </div>

          <div className="category-card category-card--horizontal">
            <div className="category-card__info">
              <div className="category-card__badge">New • Ukraine</div>
              <h3 className="category-card__title">Українська музика</h3>
              <p className="category-card__models">
                Океан Ельзи • Скрябін • Бумбокс
              </p>
              <p className="category-card__desc">
                Рідні композиції, що об'єднують покоління.
              </p>
            </div>
            <div className="category-card__media category-card__media--small">
              <img src="/images/ukrainian.jpg" alt="Українська музика" />
            </div>
          </div>
        </div>
      </section>

      <section className="home-strip">
        <div className="home-strip__carousel">
          <button
            type="button"
            className="home-strip__arrow"
            onClick={handlePrevStrip}
            aria-label="Previous"
          >
            &#8249;
          </button>

          <div className="home-strip__items">
            {visibleStripItems.map((clip) => (
              <Link
                key={clip.id}
                to={`/item/${clip.id}`}
                className="home-strip__item"
              >
                <div className="home-strip__img-box">
                  <img
                    src={clip.image || '/images/clip-default.jpg'}
                    alt={clip.songTitle}
                  />
                </div>
                <span className="home-strip__name">{clip.songTitle}</span>
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="home-strip__arrow"
            onClick={handleNextStrip}
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>

        <div className="home-strip__dots">
          {Array.from({ length: maxStripIndex + 1 }).map((_, idx) => (
            <span
              key={idx}
              className={`home-strip__dot ${idx === stripIndex ? 'active' : ''}`}
              onClick={() => setStripIndex(idx)}
            />
          ))}
        </div>
      </section>

      <section className="home-featured" id="you-may-like">
        <div className="home-featured__header">
          <h2 className="home-featured__title">You may like</h2>
        </div>

        <div className="home-featured__grid">
          {displayedClips.map((clip) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              showRemove={false}
              withLink={true}
            />
          ))}
        </div>

        {clips.length > 3 && (
          <div className="home-more">
            <PrimaryButton onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show less' : 'Show more'}
            </PrimaryButton>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
