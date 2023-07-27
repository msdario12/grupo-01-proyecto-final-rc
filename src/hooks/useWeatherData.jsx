import { useEffect, useState } from 'react';
import { backendAPI } from '../api/backendAPI';

const timeToWaitInSeconds = 30;

export const useWeatherData = () => {
	const [weatherData, setWeatherData] = useState({});
	useEffect(() => {
		const now = new Date().getTime();
		const localFetch = localStorage.getItem('lastFetchWeather');
		if (!localFetch) {
			console.log('no hay data');
			localStorage.setItem('lastFetchWeather', now);
		}
		if (now - localFetch < timeToWaitInSeconds * 1000) {
			console.log('no fetch');
			const cachedData = localStorage.getItem('weatherData');
			if (cachedData) {
				setWeatherData(JSON.parse(cachedData));
			}
			return;
		}
		localStorage.setItem('lastFetchWeather', now);
		console.log('nuevo fetch');

		backendAPI
			.get('/api/weather', {
				params: {
					location: 'San miguel de Tucuman',
				},
			})
			.then((res) => {
				setWeatherData(res.data.data);
				localStorage.setItem('weatherData', JSON.stringify(res.data.data));
			})
			.catch((e) => {
				console.log(e);
				localStorage.setItem('lastFetchWeather', now);
			});
	}, []);
	return [weatherData];
};
