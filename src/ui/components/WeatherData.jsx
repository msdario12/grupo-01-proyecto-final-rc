import { useEffect, useState } from 'react';
import { useWeatherData } from '../../hooks/useWeatherData';
import formatDistance from 'date-fns/formatDistance';
import es from 'date-fns/locale/es';
import { Spinner } from 'react-bootstrap';

export const WeatherData = () => {
	const [weatherData] = useWeatherData({});
	const [intervalDate, setIntervalDate] = useState('');

	useEffect(() => {
		const localFetch = localStorage.getItem('lastFetchWeather');
		const intervalDate = formatDistance(
			new Date(),
			new Date(JSON.parse(localFetch)),
			{ includeSeconds: true, locale: es }
		);
		setIntervalDate(intervalDate);
	}, []);

	if (!weatherData.current) {
		return (
			<div className='d-flex gap-2 align-items-center'>
				<Spinner animation='grow' size='sm' />
				<span>Cargando datos del tiempo</span>
			</div>
		);
	}
	return (
		<div className='d-flex'>
			<div className=''>
				<img
					className='img-fluid'
					src={weatherData.current.condition.icon}
					alt='Weather icon'
				/>
			</div>
			<div className='d-flex flex-column my-0 justify-content-center'>
				<p className='fw-bold fs-4 my-0'>{weatherData.current.temp_c}°C</p>
				<span className='d-none d-md-block'>{weatherData.location.name}</span>
				<span className='d-none d-md-block small'>Hace {intervalDate}</span>
			</div>
		</div>
	);
};
