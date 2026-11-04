import React from 'react';
import ClipCard from '../../components/ClipCard/ClipCard';
import SecondaryButton from '../../components/ui/SecondaryButton/SecondaryButton';
import Select from '../../components/ui/Select/Select';
import { INITIAL_CLIPS } from '../../data/clips';
import './Catalog.css';

const Catalog = () => {
  const genreOptions = [
    { value: 'all', label: 'Усі жанри' },
    { value: 'rock', label: 'Рок' },
    { value: 'grunge', label: 'Гранж' },
    { value: 'pop', label: 'Поп' },
    { value: 'ukrainian', label: 'Українська музика' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Будь-яка тривалість' },
    { value: 'short', label: 'До 260 сек.' },
    { value: 'medium', label: '261 - 300 сек.' },
    { value: 'long', label: 'Понад 300 сек.' }
  ];

  return (
    <div className="catalog-page">
      <h2>Каталог кліпів</h2>

      <div className="catalog-filters">
        <Select
          id="genre-select"
          label="Жанр"
          options={genreOptions}
        />

        <Select
          id="duration-select"
          label="Тривалість"
          options={durationOptions}
        />

        <div className="catalog-search">
          <label htmlFor="catalog-search-input" className="catalog-search__label">
            Пошук за назвою або виконавцем
          </label>
          <input
            id="catalog-search-input"
            type="text"
            className="catalog-search__input"
            placeholder="Введіть текст..."
            readOnly
          />
        </div>

        <div className="catalog-reset">
          <SecondaryButton>Очистити</SecondaryButton>
        </div>
      </div>

      <div className="cards-container">
        {INITIAL_CLIPS.map((clip) => (
          <ClipCard key={clip.id} clip={clip} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
