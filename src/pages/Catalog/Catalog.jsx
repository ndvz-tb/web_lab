import React, { useState } from 'react';
import ClipCard from '../../components/ClipCard/ClipCard';
import SecondaryButton from '../../components/ui/SecondaryButton/SecondaryButton';
import Select from '../../components/ui/Select/Select';
import { useClips } from '../../context/ClipsContext';
import './Catalog.css';

const Catalog = () => {
  const { clips } = useClips();
  const [genre, setGenre] = useState('all');
  const [durationRange, setDurationRange] = useState('all');
  const [search, setSearch] = useState('');

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

  const filteredClips = clips.filter((item) => {
    if (genre !== 'all' && item.genre !== genre) {
      return false;
    }

    if (durationRange === 'short' && item.duration > 260) {
      return false;
    }
    if (durationRange === 'medium' && (item.duration <= 260 || item.duration > 300)) {
      return false;
    }
    if (durationRange === 'long' && item.duration <= 300) {
      return false;
    }

    if (search.trim() !== '') {
      const q = search.trim().toLowerCase();
      const matchTitle = item.songTitle.toLowerCase().includes(q);
      const matchArtist = item.artistName.toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      if (!matchTitle && !matchArtist && !matchDesc) {
        return false;
      }
    }

    return true;
  });

  const handleReset = () => {
    setGenre('all');
    setDurationRange('all');
    setSearch('');
  };

  return (
    <div className="catalog-page">
      <aside className="catalog-sidebar">
        <h2 className="catalog-sidebar__title">Фільтри каталогу</h2>

        <div className="catalog-search">
          <label htmlFor="catalog-search-input" className="catalog-search__label">
            Пошук за назвою або описом
          </label>
          <input
            id="catalog-search-input"
            type="text"
            className="catalog-search__input"
            placeholder="Введіть текст..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select
          id="genre-select"
          label="Жанр"
          options={genreOptions}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <Select
          id="duration-select"
          label="Тривалість"
          options={durationOptions}
          value={durationRange}
          onChange={(e) => setDurationRange(e.target.value)}
        />

        <div className="catalog-sidebar__actions">
          <SecondaryButton className="catalog-reset__btn" onClick={handleReset}>
            Очистити фільтри
          </SecondaryButton>
        </div>
      </aside>

      <main className="catalog-content">
        <div className="catalog-header">
          <h1 className="catalog-title">Каталог кліпів</h1>
          <span className="catalog-count">
            Знайдено: {filteredClips.length}
          </span>
        </div>

        <div className="cards-grid">
          {filteredClips.length === 0 ? (
            <div className="cards-empty">Кліпів за обраними фільтрами не знайдено.</div>
          ) : (
            filteredClips.map((clip) => (
              <ClipCard key={clip.id} clip={clip} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Catalog;
