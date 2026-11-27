import React from 'react';
import './Sidebar.css';

const Sidebar = ({ clipsCount = '—', totalDuration = '—' }) => {
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
        <button type="button" id="searchBtn">Шукати</button>
        <button type="button" id="clearSearchBtn">Очистити</button>
      </div>

      <div className="filter-group">
        <label>Сортувати за переглядами:</label>
        <button type="button" id="sortDescBtn">За спаданням (більше)</button>
        <button type="button" id="sortAscBtn">За зростанням (менше)</button>
      </div>

      <div className="filter-group">
        <h4>Статистика</h4>
        <p>Кількість кліпів: <span id="clipsCount">{clipsCount}</span></p>
        <p>Загальна тривалість кліпів: <span id="totalDuration">{totalDuration}</span> сек.</p>
        <button type="button" id="countTotalBtn">Підрахувати</button>
      </div>
    </aside>
  );
};

export default Sidebar;
