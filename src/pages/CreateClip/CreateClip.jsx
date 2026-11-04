import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useClips } from '../../context/ClipsContext';
import PrimaryButton from '../../components/ui/PrimaryButton/PrimaryButton';
import Select from '../../components/ui/Select/Select';
import './CreateClip.css';

const CreateClip = () => {
  const navigate = useNavigate();
  const { addClip } = useClips();

  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState('rock');
  const [duration, setDuration] = useState('');
  const [views, setViews] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const genreOptions = [
    { value: 'rock', label: 'Рок' },
    { value: 'grunge', label: 'Гранж' },
    { value: 'pop', label: 'Поп' },
    { value: 'ukrainian', label: 'Українська музика' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (songTitle.trim().length < 2 || artistName.trim().length < 2 || !duration || !views) {
      setError('Будь ласка, заповніть усі поля коректно.');
      return;
    }

    addClip({
      songTitle: songTitle.trim(),
      artistName: artistName.trim(),
      genre,
      duration: Number(duration),
      views: Number(views),
      description: description.trim() || 'Музичний відеокліп.'
    });

    navigate('/catalog');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Створити кліп</h2>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="songTitle" className="form-label">Назва пісні</label>
          <input
            type="text"
            id="songTitle"
            className="form-input"
            placeholder="Наприклад: Let It Be"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="artistName" className="form-label">Виконавець</label>
          <input
            type="text"
            id="artistName"
            className="form-input"
            placeholder="Наприклад: The Beatles"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>

        <Select
          id="genre"
          label="Жанр"
          options={genreOptions}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <div className="form-group">
          <label htmlFor="duration" className="form-label">Тривалість (сек.)</label>
          <input
            type="number"
            id="duration"
            className="form-input"
            placeholder="Наприклад: 240"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="views" className="form-label">Перегляди</label>
          <input
            type="number"
            id="views"
            className="form-input"
            placeholder="Наприклад: 1000000"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Опис</label>
          <textarea
            id="description"
            className="form-textarea"
            placeholder="Короткий опис кліпу..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {error && <div className="form-alert">{error}</div>}

        <PrimaryButton type="submit" className="btn-submit">
          Створити
        </PrimaryButton>

        <Link to="/catalog" className="btn-back">
          Скасувати та повернутися до каталогу
        </Link>
      </form>
    </div>
  );
};

export default CreateClip;
