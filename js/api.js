const API_URL = 'http://localhost:3000/api/clips';

// ===== CREATE =====
async function apiCreateClip(clipData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clipData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create clip');
    return data;
}

// ===== READ (all) =====
async function apiGetClips() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch clips');
    return await response.json();
}

// ===== READ (one) =====
async function apiGetClip(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Clip not found');
    return await response.json();
}

// ===== UPDATE =====
async function apiUpdateClip(id, clipData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clipData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update clip');
    return data;
}

// ===== DELETE =====
async function apiDeleteClip(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to delete clip');
    return data;
}
