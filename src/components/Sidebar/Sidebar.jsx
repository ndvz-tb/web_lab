import React from 'react';
import PrimaryButton from '../ui/PrimaryButton/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton/SecondaryButton';
import './Sidebar.css';

const Sidebar = ({ clipsCount = '—', totalDuration = '—', onSearch, onClear, onSortDesc, onSortAsc, onCount }) => {
  return (
    <aside className="sidebar">
      <h3>Фільтри та Сортування</h3>

      <div className="filter-group">
        <label htmlFor="searchInput">Пошук за назвою або виконавцем:</label>
        <input
          type="text"
          id="searchInput"
          placeholder="Введіть текст..."
          readOnly
        />
        <PrimaryButton id="searchBtn" onClick={onSearch}>Шукати</PrimaryButton>
        <SecondaryButton id="clearSearchBtn" onClick={onClear}>Очистити</SecondaryButton>
      </div>

      <div className="filter-group">
        <label>Сортувати за переглядами:</label>
        <PrimaryButton id="sortDescBtn" onClick={onSortDesc}>За спаданням (більше)</PrimaryButton>
        <PrimaryButton id="sortAscBtn" onClick={onSortAsc}>За зростанням (менше)</PrimaryButton>
      </div>

      <div className="filter-group">
        <h4>Статистика</h4>
        <p>Кількість кліпів: <span id="clipsCount">{clipsCount}</span></p>
        <p>Загальна тривалість кліпів: <span id="totalDuration">{totalDuration}</span> сек.</p>
        <PrimaryButton id="countTotalBtn" onClick={onCount}>Підрахувати</PrimaryButton>
      </div>
    </aside>
  );
};

export default Sidebar;
