import { useEffect, useState } from 'react';
import { backendAPI } from '../api/backendAPI';

export const useWeatherData = () => {
	const [weatherData, setWeatherData] = useState({});
	useEffect(() => {
		backendAPI
			.get('/api/weather', {
				params: {
					location: 'San miguel de Tucuman',
				},
			})
			.then((res) => setWeatherData(res.data.data));
	}, []);
	return [weatherData];
};
