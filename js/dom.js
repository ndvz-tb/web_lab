function createClipCard(clip) {
    return `
        <div class="card" data-id="${clip.id}">
            <h3>${clip.songTitle}</h3>
            <div class="artist">${clip.artistName}</div>
            <div class="info">Тривалість: ${clip.duration} сек.</div>
            <div class="info">Переглядів: ${clip.views}</div>
            <div class="card-actions">
                <button class="edit-btn" onclick="openEditModal(${clip.id})">Редагувати</button>
                <button class="delete-btn" onclick="deleteClip(${clip.id})">Видалити</button>
            </div>
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