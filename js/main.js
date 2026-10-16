let clips = [];
let currentClips = [];

// Load clips from API on page load
async function loadClips() {
    try {
        clips = await apiGetClips();
        currentClips = [...clips];
        renderClips(currentClips);
    } catch (error) {
        console.error('Error loading clips:', error);
        document.getElementById('clipsContainer').innerHTML =
            '<p style="color: red;">Помилка завантаження кліпів. Переконайтеся, що сервер запущений.</p>';
    }
}

// Delete clip via API
async function deleteClip(id) {
    if (!confirm('Ви впевнені, що хочете видалити цей кліп?')) return;
    try {
        await apiDeleteClip(id);
        await loadClips();
    } catch (error) {
        alert('Помилка видалення: ' + error.message);
    }
}

// Open edit modal
function openEditModal(id) {
    const clip = currentClips.find(c => c.id === id);
    if (!clip) return;

    document.getElementById('editClipId').value = clip.id;
    document.getElementById('editArtistName').value = clip.artistName;
    document.getElementById('editSongTitle').value = clip.songTitle;
    document.getElementById('editDuration').value = clip.duration;
    document.getElementById('editViews').value = clip.views;

    document.getElementById('editModal').style.display = 'block';
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Save edited clip via API (PUT)
async function saveEditClip(event) {
    event.preventDefault();

    const id = Number(document.getElementById('editClipId').value);
    const clipData = {
        artistName: document.getElementById('editArtistName').value.trim(),
        songTitle: document.getElementById('editSongTitle').value.trim(),
        duration: Number(document.getElementById('editDuration').value),
        views: Number(document.getElementById('editViews').value)
    };

    try {
        await apiUpdateClip(id, clipData);
        closeEditModal();
        await loadClips();
    } catch (error) {
        alert('Помилка оновлення: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Load clips from server
    loadClips();

    // Search functionality
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

    // Sort functionality
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

    // Total duration counter
    const countTotalBtn = document.getElementById('countTotalBtn');
    const totalDurationSpan = document.getElementById('totalDuration');
    if (countTotalBtn) {
        countTotalBtn.addEventListener('click', () => {
            const total = currentClips.reduce((sum, clip) => sum + clip.duration, 0);
            totalDurationSpan.textContent = total;
        });
    }

    // Edit modal handlers
    const editForm = document.getElementById('editClipForm');
    if (editForm) {
        editForm.addEventListener('submit', saveEditClip);
    }

    const cancelEditBtn = document.getElementById('cancelEditBtn');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', closeEditModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('editModal');
        if (event.target === modal) {
            closeEditModal();
        }
    });
});