// js/main.js

// Початкові дані
let clips = [
    { artistName: "The Beatles", songTitle: "Let It Be", duration: 243, views: 150000000 },
    { artistName: "Queen", songTitle: "Bohemian Rhapsody", duration: 354, views: 1600000000 },
    { artistName: "Nirvana", songTitle: "Smells Like Teen Spirit", duration: 278, views: 1700000000 },
    { artistName: "Michael Jackson", songTitle: "Billie Jean", duration: 294, views: 1400000000 },
    { artistName: "Океан Ельзи", songTitle: "Без бою", duration: 260, views: 45000000 }
];

// Поточний стан (для фільтрації/сортування)
let currentClips = [...clips];

document.addEventListener('DOMContentLoaded', () => {
    // Рендеримо кліпи при завантаженні
    renderClips(currentClips);

    // --- Пошук ---
    const searchBtn = document.getElementById('searchBtn');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase().trim();
            currentClips = clips.filter(clip => 
                clip.songTitle.toLowerCase().includes(query) || 
                clip.artistName.toLowerCase().includes(query)
            );
            renderClips(currentClips);
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentClips = [...clips];
            renderClips(currentClips);
        });
    }

    // --- Сортування ---
    const sortDescBtn = document.getElementById('sortDescBtn');
    const sortAscBtn = document.getElementById('sortAscBtn');

    if (sortDescBtn) {
        sortDescBtn.addEventListener('click', () => {
            currentClips.sort((a, b) => b.views - a.views);
            renderClips(currentClips);
        });
    }

    if (sortAscBtn) {
        sortAscBtn.addEventListener('click', () => {
            currentClips.sort((a, b) => a.views - b.views);
            renderClips(currentClips);
        });
    }

    // --- Підрахунок загальної тривалості ---
    const countTotalBtn = document.getElementById('countTotalBtn');
    const totalDurationSpan = document.getElementById('totalDuration');

    if (countTotalBtn) {
        countTotalBtn.addEventListener('click', () => {
            const total = currentClips.reduce((sum, clip) => sum + clip.duration, 0);
            totalDurationSpan.textContent = total;
        });
    }
});
