import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getClips = async (params = {}) => {
  const cleanParams = {};

  if (params.genre && params.genre !== 'all') {
    cleanParams.genre = params.genre;
  }

  if (params.duration && params.duration !== 'all') {
    cleanParams.duration = params.duration;
  }

  if (params.q && params.q.trim() !== '') {
    cleanParams.q = params.q.trim();
  }

  const response = await apiClient.get('/clips', { params: cleanParams });
  return response.data;
};

export const getClipById = async (id) => {
  const response = await apiClient.get(`/clips/${id}`);
  return response.data;
};

export const createClip = async (clipData) => {
  const response = await apiClient.post('/clips', clipData);
  return response.data;
};

export const updateClip = async (id, clipData) => {
  const response = await apiClient.put(`/clips/${id}`, clipData);
  return response.data;
};

export const deleteClip = async (id) => {
  const response = await apiClient.delete(`/clips/${id}`);
  return response.data;
};

export default apiClient;
