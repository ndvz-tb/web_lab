const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.redirect('/data/index.html');
});

function loadData() {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

app.get('/api/clips/search', (req, res) => {
    const query = (req.query.q || '').toLowerCase().trim();
    const items = loadData();

    if (!query) {
        return res.json(items);
    }

    const filtered = items.filter(clip =>
        (clip.songTitle && clip.songTitle.toLowerCase().includes(query)) ||
        (clip.artistName && clip.artistName.toLowerCase().includes(query))
    );
    res.json(filtered);
});

app.get('/api/clips/count', (req, res) => {
    const items = loadData();
    res.json({ count: items.length });
});

app.get('/api/clips/total-duration', (req, res) => {
    const items = loadData();
    const total = items.reduce((sum, clip) => sum + Number(clip.duration || 0), 0);
    res.json({ totalDuration: total });
});

app.get('/api/clips', (req, res) => {
    res.json(loadData());
});

app.get('/api/clips/:id', (req, res) => {
    const id = Number(req.params.id);
    const items = loadData();
    const clip = items.find(c => c.id === id);

    if (!clip) {
        return res.status(404).json({ error: 'Clip not found' });
    }
    res.json(clip);
});

app.post('/api/clips', (req, res) => {
    const payload = req.body;
    if (!payload || Object.keys(payload).length === 0) {
        return res.status(400).json({ error: 'Invalid JSON body' });
    }

    const items = loadData();
    const newId = items.length > 0 ? Math.max(...items.map(c => c.id || 0)) + 1 : 1;
    const newClip = {
        id: newId,
        artistName: payload.artistName || '',
        songTitle: payload.songTitle || '',
        duration: Number(payload.duration || 0),
        views: Number(payload.views || 0)
    };

    items.push(newClip);
    saveData(items);
    res.status(201).json(newClip);
});

app.put('/api/clips/:id', (req, res) => {
    const id = Number(req.params.id);
    const payload = req.body;
    if (!payload) {
        return res.status(400).json({ error: 'Invalid JSON body' });
    }

    const items = loadData();
    const index = items.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Clip not found' });
    }

    items[index] = {
        ...items[index],
        artistName: payload.artistName !== undefined ? payload.artistName : items[index].artistName,
        songTitle: payload.songTitle !== undefined ? payload.songTitle : items[index].songTitle,
        duration: payload.duration !== undefined ? Number(payload.duration) : items[index].duration,
        views: payload.views !== undefined ? Number(payload.views) : items[index].views,
        id: id
    };

    saveData(items);
    res.json(items[index]);
});

app.delete('/api/clips/:id', (req, res) => {
    const id = Number(req.params.id);
    const items = loadData();
    const filtered = items.filter(c => c.id !== id);

    if (filtered.length === items.length) {
        return res.status(404).json({ error: 'Clip not found' });
    }

    saveData(filtered);
    res.json({ message: `Clip ${id} deleted successfully` });
});

app.listen(PORT, () => {
    console.log(`Node.js Express REST API server running at http://127.0.0.1:${PORT}`);
});
