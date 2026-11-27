import React, { useState, useEffect } from 'react';
import ClipCard from '../../components/ClipCard/ClipCard';
import SecondaryButton from '../../components/ui/SecondaryButton/SecondaryButton';
import Select from '../../components/ui/Select/Select';
import Loader from '../../components/ui/Loader/Loader';
import { getClips } from '../../api/clipsApi';
import { useClips } from '../../context/ClipsContext';
import './Catalog.css';

const Catalog = () => {
  const { removeClip } = useClips();
  const [genre, setGenre] = useState('all');
  const [durationRange, setDurationRange] = useState('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [catalogClips, setCatalogClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let isCancelled = false;

    const fetchCatalog = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getClips({
          genre,
          duration: durationRange,
          q: debouncedSearch
        });
        if (!isCancelled) {
          setCatalogClips(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError('Не вдалося завантажити кліпи з сервера. Перевірте запуск API.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchCatalog();

    return () => {
      isCancelled = true;
    };
  }, [genre, durationRange, debouncedSearch]);

  const handleReset = () => {
    setGenre('all');
    setDurationRange('all');
    setSearch('');
    setDebouncedSearch('');
  };

  const handleRemoveClip = async (id) => {
    try {
      await removeClip(id);
      setCatalogClips((prev) => prev.filter((item) => item.id !== Number(id)));
    } catch (err) {
      setError('Не вдалося видалити кліп.');
    }
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
            Знайдено: {loading ? '...' : catalogClips.length}
          </span>
        </div>

        {loading ? (
          <Loader text="Завантаження каталогу..." />
        ) : error ? (
          <div className="cards-empty">{error}</div>
        ) : (
          <div className="cards-grid">
            {catalogClips.length === 0 ? (
              <div className="cards-empty">Кліпів за обраними фільтрами не знайдено.</div>
            ) : (
              catalogClips.map((clip) => (
                <ClipCard
                  key={clip.id}
                  clip={clip}
                  onRemove={handleRemoveClip}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Catalog;
