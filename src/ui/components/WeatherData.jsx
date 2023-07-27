
import { useWeatherData } from '../../hooks/useWeatherData';

export const WeatherData = () => {
	const [weatherData] = useWeatherData();
	console.log(weatherData);
	if (!weatherData.current) {
		return 'Cargando datos...';
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
			</div>
		</div>
	);
};
