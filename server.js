const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Clips REST API server is running', port: PORT });
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

function getFilteredAndSorted(reqQuery) {
  let items = loadData();
  const query = (reqQuery.q || reqQuery.search || '').toLowerCase().trim();
  const genre = (reqQuery.genre || '').toLowerCase().trim();
  const durationRange = (reqQuery.duration || '').toLowerCase().trim();
  const { sort, order } = reqQuery;

  if (genre && genre !== 'all') {
    items = items.filter((clip) => (clip.genre || '').toLowerCase() === genre);
  }

  if (durationRange && durationRange !== 'all') {
    if (durationRange === 'short') {
      items = items.filter((clip) => Number(clip.duration) <= 260);
    } else if (durationRange === 'medium') {
      items = items.filter(
        (clip) => Number(clip.duration) > 260 && Number(clip.duration) <= 300
      );
    } else if (durationRange === 'long') {
      items = items.filter((clip) => Number(clip.duration) > 300);
    }
  }

  if (query) {
    items = items.filter(
      (clip) =>
        (clip.songTitle && clip.songTitle.toLowerCase().includes(query)) ||
        (clip.artistName && clip.artistName.toLowerCase().includes(query)) ||
        (clip.description && clip.description.toLowerCase().includes(query))
    );
  }

  if (sort === 'views' || order === 'asc' || order === 'desc') {
    if (order === 'asc') {
      items.sort((a, b) => Number(a.views || 0) - Number(b.views || 0));
    } else if (order === 'desc') {
      items.sort((a, b) => Number(b.views || 0) - Number(a.views || 0));
    }
  }

  return items;
}

app.get('/api/clips/search', (req, res) => {
  res.json(getFilteredAndSorted(req.query));
});

app.get('/api/clips/count', (req, res) => {
  const items = getFilteredAndSorted(req.query);
  res.json({ count: items.length });
});

app.get('/api/clips/total-duration', (req, res) => {
  const items = getFilteredAndSorted(req.query);
  const total = items.reduce((sum, clip) => sum + Number(clip.duration || 0), 0);
  res.json({ totalDuration: total });
});

app.get('/api/clips', (req, res) => {
  const items = getFilteredAndSorted(req.query);
  setTimeout(() => {
    res.json(items);
  }, 300);
});

app.get('/api/clips/:id', (req, res) => {
  const id = Number(req.params.id);
  const items = loadData();
  const clip = items.find((c) => c.id === id);

  if (!clip) {
    return res.status(404).json({ error: 'Clip not found' });
  }

  setTimeout(() => {
    res.json(clip);
  }, 200);
});

app.post('/api/clips', (req, res) => {
  const payload = req.body;
  if (!payload || Object.keys(payload).length === 0) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const items = loadData();
  const newId = items.length > 0 ? Math.max(...items.map((c) => c.id || 0)) + 1 : 1;
  const newClip = {
    id: newId,
    artistName: payload.artistName || '',
    songTitle: payload.songTitle || '',
    genre: payload.genre || 'rock',
    duration: Number(payload.duration || 0),
    views: Number(payload.views || 0),
    description: payload.description || 'Музичний відеокліп.',
    image: payload.image || '/images/clip-default.jpg'
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
  const index = items.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Clip not found' });
  }

  items[index] = {
    ...items[index],
    artistName: payload.artistName !== undefined ? payload.artistName : items[index].artistName,
    songTitle: payload.songTitle !== undefined ? payload.songTitle : items[index].songTitle,
    genre: payload.genre !== undefined ? payload.genre : items[index].genre,
    duration: payload.duration !== undefined ? Number(payload.duration) : items[index].duration,
    views: payload.views !== undefined ? Number(payload.views) : items[index].views,
    description: payload.description !== undefined ? payload.description : items[index].description,
    image: payload.image !== undefined ? payload.image : items[index].image,
    id: id
  };

  saveData(items);
  res.json(items[index]);
});

app.delete('/api/clips/:id', (req, res) => {
  const id = Number(req.params.id);
  const items = loadData();
  const filtered = items.filter((c) => c.id !== id);

  if (filtered.length === items.length) {
    return res.status(404).json({ error: 'Clip not found' });
  }

  saveData(filtered);
  res.json({ message: `Clip ${id} deleted successfully` });
});

app.listen(PORT, () => {
  console.log(`Node.js Express REST API server running at http://127.0.0.1:${PORT}`);
});
