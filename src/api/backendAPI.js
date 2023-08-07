import axios from 'axios';

const remoteHost = 'https://backend-grupo-01-proyecto-final-rc-zorb-dev.fl0.io';

const URL = remoteHost;

export const backendAPI = axios.create({
	baseURL: URL,
});

export const privateBackendAPI = axios.create({
	baseURL: URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
