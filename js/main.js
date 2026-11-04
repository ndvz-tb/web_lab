import { getAllClips, deleteClip, searchClips, getClipsCount, getTotalDuration, getSortedClips } from "./api.js";

let clips = [];
let currentSearch = "";
let currentOrder = "";

function renderView(items) {
  renderClips(items);
}

async function loadClips() {
  try {
    clips = await getAllClips(currentSearch, currentOrder);
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

  if (searchBtn) {
    searchBtn.addEventListener('click', async () => {
      currentSearch = searchInput.value.trim();
      try {
        clips = await searchClips(currentSearch, currentOrder);
        renderView(clips);
      } catch (err) {
        console.error(err);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        currentSearch = searchInput.value.trim();
        try {
          clips = await searchClips(currentSearch, currentOrder);
          renderView(clips);
        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', async () => {
      searchInput.value = '';
      currentSearch = '';
      currentOrder = '';
      await loadClips();
    });
  }

  const sortDescBtn = document.getElementById('sortDescBtn');
  const sortAscBtn = document.getElementById('sortAscBtn');

  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', async () => {
      currentOrder = 'desc';
      try {
        clips = await getSortedClips(currentOrder, currentSearch);
        renderView(clips);
      } catch (err) {
        console.error(err);
      }
    });
  }
  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', async () => {
      currentOrder = 'asc';
      try {
        clips = await getSortedClips(currentOrder, currentSearch);
        renderView(clips);
      } catch (err) {
        console.error(err);
      }
    });
  }

  const countTotalBtn = document.getElementById('countTotalBtn');
  if (countTotalBtn) {
    countTotalBtn.addEventListener('click', async () => {
      try {
        const countData = await getClipsCount(currentSearch);
        const countEl = document.getElementById('clipsCount');
        if (countEl) countEl.textContent = countData.count;

        const durationData = await getTotalDuration(currentSearch);
        const totalEl = document.getElementById('totalDuration');
        if (totalEl) totalEl.textContent = durationData.totalDuration;
      } catch (err) {
        console.error(err);
      }
    });
  }

  const container = document.getElementById('clipsContainer');
  if (container) {
    container.addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = Number(e.target.dataset.id);
        if (!confirm('Ви впевнені, що хочете видалити цей кліп?')) return;
        try {
          await deleteClip(id);
          await loadClips();
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
