// js/dom.js

// Функція для створення HTML-карточки кліпу
function createClipCard(clip) {
    return `
        <div class="card">
            <h3>${clip.songTitle}</h3>
            <div class="artist">${clip.artistName}</div>
            <div class="info">Тривалість: ${clip.duration} сек.</div>
            <div class="info">Переглядів: ${clip.views.toLocaleString('uk-UA')}</div>
        </div>
    `;
}

// Функція для рендеру всіх кліпів на сторінці
function renderClips(clipsArray) {
    const container = document.getElementById('clipsContainer');
    if (!container) return;

    // Очищаємо контейнер
    container.innerHTML = '';

    // Якщо масив порожній
    if (clipsArray.length === 0) {
        container.innerHTML = '<p>Кліпів не знайдено.</p>';
        return;
    }

    // Додаємо картки
    clipsArray.forEach(clip => {
        const cardHTML = createClipCard(clip);
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}
