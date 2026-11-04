import React from 'react';
import PrimaryButton from '../ui/PrimaryButton/PrimaryButton';
import './Sidebar.css';

const Sidebar = ({
  onSortDesc,
  onSortAsc,
  clipsCount = '—',
  totalDuration = '—',
  onCount
}) => {
  return (
    <aside className="sidebar">
      <h3>Фільтри та Сортування</h3>

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
