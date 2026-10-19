import { getAllClips, deleteClip, searchClips, getClipsCount, getTotalDuration } from "./api.js";

let clips = [];

function renderView(items) {
  renderClips(items);
}

async function loadClips() {
  try {
    clips = await getAllClips();
    renderView(clips);
  } catch (err) {
    console.error(err);
    const container = document.getElementById('clipsContainer');
    if (container) {
      container.innerHTML = '<p style="color: red;">Помилка завантаження кліпів. Переконайтеся, що сервер запущений.</p>';
    }
  }
}

function initEventListeners() {
  const searchBtn = document.getElementById('searchBtn');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchInput = document.getElementById('searchInput');

  // Пошук через бекенд: GET /api/clips/search?q=...
  if (searchBtn) {
    searchBtn.addEventListener('click', async () => {
      const query = searchInput.value.trim();
      try {
        const results = await searchClips(query);
        renderView(results);
      } catch (err) {
        console.error(err);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        try {
          const results = await searchClips(query);
          renderView(results);
        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', async () => {
      searchInput.value = '';
      await loadClips();
    });
  }

  // Сортування (залишається на фронті — це не запит на дані)
  const sortDescBtn = document.getElementById('sortDescBtn');
  const sortAscBtn = document.getElementById('sortAscBtn');

  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', () => {
      const sorted = [...clips].sort((a, b) => b.views - a.views);
      renderView(sorted);
    });
  }
  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', () => {
      const sorted = [...clips].sort((a, b) => a.views - b.views);
      renderView(sorted);
    });
  }

  // Підрахунок кількості кліпів через бекенд: GET /api/clips/count
  const countTotalBtn = document.getElementById('countTotalBtn');
  if (countTotalBtn) {
    countTotalBtn.addEventListener('click', async () => {
      try {
        const countData = await getClipsCount();
        const countEl = document.getElementById('clipsCount');
        if (countEl) countEl.textContent = countData.count;

        // Сумарна тривалість через бекенд: GET /api/clips/total-duration
        const durationData = await getTotalDuration();
        const totalEl = document.getElementById('totalDuration');
        if (totalEl) totalEl.textContent = durationData.totalDuration;
      } catch (err) {
        console.error(err);
      }
    });
  }

  // Event delegation for Edit and Delete buttons on cards
  const container = document.getElementById('clipsContainer');
  if (container) {
    container.addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = Number(e.target.dataset.id);
        if (!confirm('Ви впевнені, що хочете видалити цей кліп?')) return;
        try {
          await deleteClip(id);
          clips = clips.filter(clip => clip.id !== id);
          renderView(clips);
        } catch (err) {
          console.error(err);
        }
      } else if (e.target.classList.contains('edit-btn')) {
        const id = Number(e.target.dataset.id);
        window.location.href = `./edit.html?id=${id}`;
      }
    });
  }
}

initEventListeners();
loadClips();