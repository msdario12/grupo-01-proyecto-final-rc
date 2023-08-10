import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { privateBackendAPI } from '../api/backendAPI';
import { useNavigate } from 'react-router-dom';

export const useAxiosPrivate = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		const requestIntercept = privateBackendAPI.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = privateBackendAPI.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response.status === 401) {
					// Redireccionar al no tener autenticación
					navigate('/login');
				}
			}
		);

		return () => {
			privateBackendAPI.interceptors.request.eject(requestIntercept);
			privateBackendAPI.interceptors.response.eject(responseIntercept);
		};
	}, [auth]);

	return { privateBackendAPI };
};
