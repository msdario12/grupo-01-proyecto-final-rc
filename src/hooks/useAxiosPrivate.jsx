import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { privateBackendAPI } from '../api/backendAPI';

export const useAxiosPrivate = () => {
	const { auth } = useAuth();
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

		return () => {
			privateBackendAPI.interceptors.request.eject(requestIntercept);
		};
	}, [auth]);

	return { privateBackendAPI };
};
