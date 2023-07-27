export const WeatherData = () => {
	return (
		<div className='d-flex'>
			<div className=''>
				<img
					className='img-fluid'
					src='http://cdn.weatherapi.com/weather/64x64/night/113.png'
					alt='Weather icon'
				/>
			</div>
			<div className='d-flex flex-column my-0 justify-content-center'>
				<p className='fw-bold fs-4 my-0'>23°C</p>
				<span className='d-none d-md-block'>San Miguel de Tucumán</span>
			</div>
		</div>
	);
};
