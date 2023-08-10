import { useEffect, useState } from 'react';
import { backendAPI } from '../api/backendAPI';

const timeToWaitInSeconds = 300;

export const useWeatherData = () => {
	const [weatherData, setWeatherData] = useState({});

	useEffect(() => {
		// obtener localizacion
		navigator.geolocation.getCurrentPosition(function (position) {
			const now = new Date().getTime();
			const localFetch = localStorage.getItem('lastFetchWeather');
			if (!localFetch) {
				localStorage.setItem('lastFetchWeather', now);
			}
			if (now - localFetch < timeToWaitInSeconds * 1000) {
				const cachedData = localStorage.getItem('weatherData');
				if (cachedData) {
					setWeatherData(JSON.parse(cachedData));
				}
				return;
			}
			localStorage.setItem('lastFetchWeather', now);

			backendAPI
				.get('/api/weather', {
					params: {
						location: `${position.coords.latitude}, ${position.coords.longitude}`,
					},
				})
				.then((res) => {
					setWeatherData(res.data.data);
					localStorage.setItem('weatherData', JSON.stringify(res.data.data));
				})
				.catch((e) => {
					localStorage.removeItem('lastFetchWeather');
					localStorage.removeItem('weatherData');
				});
		});
	}, []);

	return [weatherData];
};
