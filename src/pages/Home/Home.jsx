import React from 'react';
import { Link } from 'react-router-dom';
import ClipCard from '../../components/ClipCard/ClipCard';
import PrimaryButton from '../../components/ui/PrimaryButton/PrimaryButton';
import { INITIAL_CLIPS } from '../../data/clips';
import './Home.css';

const Home = () => {
  const featuredClips = INITIAL_CLIPS.slice(0, 3);
  const stripClips = INITIAL_CLIPS.slice(0, 4);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <h1 className="home-hero__title">
            Відкривай культові музичні кліпи
          </h1>
          <p className="home-hero__desc">
            Найкращі рок-балади, гранж, поп-ікони та українська музика в одній
            колекції. Досліджуйте класичні відеокліпи та сучасні хіти у зручному каталозі.
          </p>
          <div className="home-hero__actions">
            <Link to="/catalog">
              <PrimaryButton className="home-hero__btn">Show More</PrimaryButton>
            </Link>
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
            <div className="category-card__badge">Popular • Rock & Grunge</div>
            <h2 className="category-card__title">Рок та гранж легенди</h2>
            <p className="category-card__models">
              Queen • Nirvana • The Beatles • Linkin Park • Metallica
            </p>
            <p className="category-card__desc">
              Енергійні гітарні рифи, культові відеокліпи та світова класика, що
              змінила історію сучасної музики.
            </p>
          </div>
          <div className="category-card__media">
            <img src="/images/rock.jpg" alt="Рок та гранж" />
          </div>
        </div>

        <div className="category-column">
          <div className="category-card category-card--horizontal">
            <div className="category-card__info">
              <div className="category-card__badge">Trending • Pop</div>
              <h3 className="category-card__title">Поп та синті-хіти</h3>
              <p className="category-card__models">
                Michael Jackson • The Weeknd
              </p>
              <p className="category-card__desc">
                Яскрава хореографія, неонова естетика та мільярди переглядів у всьому світі.
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
                Рідні композиції, що об'єднують покоління — від теплої лірики до стадіонного року.
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
          <div className="home-strip__items">
            {stripClips.map((clip) => (
              <div key={clip.id} className="home-strip__item">
                <div className="home-strip__img-box">
                  <img src={clip.image} alt={clip.songTitle} />
                </div>
                <span className="home-strip__name">
                  {clip.artistName} — {clip.songTitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-featured" id="you-may-like">
        <div className="home-featured__header">
          <h2 className="home-featured__title">You may like</h2>
          <Link to="/catalog" className="home-featured__catalog-link">
            Увесь каталог →
          </Link>
        </div>

        <div className="home-featured__grid">
          {featuredClips.map((clip) => (
            <ClipCard key={clip.id} clip={clip} showRemove={false} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
