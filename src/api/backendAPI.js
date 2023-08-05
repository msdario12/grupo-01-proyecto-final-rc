import axios from 'axios';

const URL = 'http://localhost:4000';

export const backendAPI = axios.create({
	baseURL: URL,
});

export const privateBackendAPI = axios.create({
	baseURL: URL,
	headers: { 'Content-Type': 'application/json;' },
	withCredentials: true,
});
