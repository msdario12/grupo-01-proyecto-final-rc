import axios from 'axios';

export const backendAPI = axios.create({
	baseURL: 'http://localhost:4000',
});
