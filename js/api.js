const BASE_URL = 'http://127.0.0.1:3000/api';
const RESOURCE_URL = `${BASE_URL}/clips`;

const baseRequest = async ({urlPath = "", method = 'GET', body = null}) => {
    try {
        const reqParams = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        if (body) {
            reqParams.body = JSON.stringify(body);
        }
        return await fetch(`${RESOURCE_URL}${urlPath}`, reqParams);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllClips = async () => {
    const rawResp = await baseRequest({method: "GET"});
    return rawResp.json();
}

export const getClipById = async (id) => {
    const rawResp = await baseRequest({urlPath: `/${id}`, method: "GET"});
    return rawResp.json();
}

export const createClip = async (clip) => {
    const rawResp = await baseRequest({method: "POST", body: clip});
    return rawResp.json();
}

export const updateClip = async (id, clip) => {
    const rawResp = await baseRequest({urlPath: `/${id}`, method: "PUT", body: clip});
    return rawResp.json();
}

export const deleteClip = async (id) => {
    const rawResp = await baseRequest({urlPath: `/${id}`, method: "DELETE"});
    return rawResp.json();
}

// Пошук кліпів на бекенді: GET /api/clips/search?q=...
export const searchClips = async (query) => {
    const rawResp = await baseRequest({urlPath: `/search?q=${encodeURIComponent(query)}`, method: "GET"});
    return rawResp.json();
}

// Кількість кліпів на бекенді: GET /api/clips/count
export const getClipsCount = async () => {
    const rawResp = await baseRequest({urlPath: `/count`, method: "GET"});
    return rawResp.json();
}

// Сумарна тривалість кліпів на бекенді: GET /api/clips/total-duration
export const getTotalDuration = async () => {
    const rawResp = await baseRequest({urlPath: `/total-duration`, method: "GET"});
    return rawResp.json();
}
