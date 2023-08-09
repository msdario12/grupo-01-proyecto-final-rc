import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

export const backendAPI = axios.create({
	baseURL: URL,
});

export const privateBackendAPI = axios.create({
	baseURL: URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
