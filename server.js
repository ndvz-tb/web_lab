const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'db.json');

// Initialize db.json with default clips if it doesn't exist
function initDB() {
    if (!fs.existsSync(DATA_FILE)) {
        const defaultClips = [
            { id: 1, artistName: "The Beatles", songTitle: "Let It Be", duration: 243, views: 150000000 },
            { id: 2, artistName: "Queen", songTitle: "Bohemian Rhapsody", duration: 354, views: 1600000000 },
            { id: 3, artistName: "Nirvana", songTitle: "Smells Like Teen Spirit", duration: 278, views: 1700000000 },
            { id: 4, artistName: "Michael Jackson", songTitle: "Billie Jean", duration: 294, views: 1400000000 },
            { id: 5, artistName: "Океан Ельзи", songTitle: "Без бою", duration: 260, views: 45000000 }
        ];
        fs.writeFileSync(DATA_FILE, JSON.stringify({ clips: defaultClips, nextId: 6 }, null, 2));
    }
}

function readDB() {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
}

function writeDB(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// MIME types for serving static files
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function serveStaticFile(res, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'File not found' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(data);
    });
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', reject);
    });
}

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

initDB();

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;
    const method = req.method;

    // CORS preflight
    if (method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // ==================== REST API ====================

    // GET /api/clips — Read all clips
    if (pathname === '/api/clips' && method === 'GET') {
        const db = readDB();
        sendJSON(res, 200, db.clips);
        return;
    }

    // GET /api/clips/:id — Read one clip
    const singleMatch = pathname.match(/^\/api\/clips\/(\d+)$/);
    if (singleMatch && method === 'GET') {
        const db = readDB();
        const clip = db.clips.find(c => c.id === Number(singleMatch[1]));
        if (!clip) {
            sendJSON(res, 404, { error: 'Clip not found' });
            return;
        }
        sendJSON(res, 200, clip);
        return;
    }

    // POST /api/clips — Create a new clip
    if (pathname === '/api/clips' && method === 'POST') {
        try {
            const body = await parseBody(req);
            const { artistName, songTitle, duration, views } = body;

            // Validation
            const errors = [];
            if (!artistName || artistName.trim() === '') errors.push("Введіть ім'я виконавця.");
            if (!songTitle || songTitle.trim() === '') errors.push("Введіть назву пісні.");
            if (!duration || Number(duration) <= 0) errors.push("Тривалість має бути більшою за 0.");
            if (views === undefined || views === null || Number(views) < 0) errors.push("Кількість переглядів не може бути від'ємною.");

            if (errors.length > 0) {
                sendJSON(res, 400, { error: errors.join(' ') });
                return;
            }

            const db = readDB();
            const newClip = {
                id: db.nextId,
                artistName: artistName.trim(),
                songTitle: songTitle.trim(),
                duration: Number(duration),
                views: Number(views)
            };
            db.clips.push(newClip);
            db.nextId++;
            writeDB(db);

            sendJSON(res, 201, newClip);
        } catch (e) {
            sendJSON(res, 400, { error: 'Invalid request body' });
        }
        return;
    }

    // PUT /api/clips/:id — Update an existing clip
    if (singleMatch && method === 'PUT') {
        try {
            const body = await parseBody(req);
            const db = readDB();
            const idx = db.clips.findIndex(c => c.id === Number(singleMatch[1]));
            if (idx === -1) {
                sendJSON(res, 404, { error: 'Clip not found' });
                return;
            }

            const { artistName, songTitle, duration, views } = body;

            // Validation
            const errors = [];
            if (!artistName || artistName.trim() === '') errors.push("Введіть ім'я виконавця.");
            if (!songTitle || songTitle.trim() === '') errors.push("Введіть назву пісні.");
            if (!duration || Number(duration) <= 0) errors.push("Тривалість має бути більшою за 0.");
            if (views === undefined || views === null || Number(views) < 0) errors.push("Кількість переглядів не може бути від'ємною.");

            if (errors.length > 0) {
                sendJSON(res, 400, { error: errors.join(' ') });
                return;
            }

            db.clips[idx] = {
                ...db.clips[idx],
                artistName: artistName.trim(),
                songTitle: songTitle.trim(),
                duration: Number(duration),
                views: Number(views)
            };
            writeDB(db);

            sendJSON(res, 200, db.clips[idx]);
        } catch (e) {
            sendJSON(res, 400, { error: 'Invalid request body' });
        }
        return;
    }

    // DELETE /api/clips/:id — Delete a clip
    if (singleMatch && method === 'DELETE') {
        const db = readDB();
        const idx = db.clips.findIndex(c => c.id === Number(singleMatch[1]));
        if (idx === -1) {
            sendJSON(res, 404, { error: 'Clip not found' });
            return;
        }
        const deleted = db.clips.splice(idx, 1)[0];
        writeDB(db);
        sendJSON(res, 200, deleted);
        return;
    }

    // ==================== STATIC FILES ====================

    // Default route: serve index.html
    if (pathname === '/' || pathname === '/index.html') {
        serveStaticFile(res, path.join(__dirname, 'data', 'index.html'));
        return;
    }

    // Serve static files from project root
    const safePath = path.join(__dirname, pathname);
    if (safePath.startsWith(__dirname)) {
        serveStaticFile(res, safePath);
        return;
    }

    sendJSON(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/data/index.html in your browser`);
});
