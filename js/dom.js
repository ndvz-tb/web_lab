function createClipCard(clip) {
    return `
        <div class="card">
            <h3>${clip.songTitle}</h3>
            <div class="artist">${clip.artistName}</div>
            <div class="info">Тривалість: ${clip.duration} сек.</div>
            <div class="info">Переглядів: ${clip.views}</div>
        </div>
    `;
}

function renderClips(clipsArray) {
    const container = document.getElementById('clipsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (clipsArray.length === 0) {
        container.innerHTML = '<p>Кліпів не знайдено.</p>';
        return;
    }

    clipsArray.forEach(clip => {
        const cardHTML = createClipCard(clip);
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}