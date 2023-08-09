import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Servicios.css';

const servicesContent = [
	{
		title: 'EXÁMENES MEDICOS COMPLETOS',
		content:
			'Consulta medica general, problemas de piel, perros y/o gatos con síntomas de vómitos y diarrea. Dermatogologia',
		src: 'https://i.ibb.co/v1Xk18b/pexels-photo-6235233.jpg',
		alt: 'Imagen de un perro siendo atendido.',
	},
	{
		title: 'MONITOREO CARDÍACO Y RESPIRATORIO',
		content: 'Servicio de electrocardiograma y diagnóstico cardiologic.',
		src: 'https://i.ibb.co/vHcn187/pexels-photo-6235663.jpg',
		alt: 'Veterinario con uniforme.',
	},
	{
		title: 'VACUNAS Y REFUERZOS',
		content:
			'Plan de vacunación para cachorros y adultos. Quintuple, sextuple, antirrábica, triple felina, leucemia felina.',
		src: 'https://i.ibb.co/JWLJnqL/pexels-photo-6816869.jpg',
		alt: 'Gatito recibiendo tratamiento.',
	},
	{
		title: 'CUIDADO DENTAL',
		content: 'El cuidado de sus dientes debe empezar cuando aun es cachorro.',
		src: 'https://i.ibb.co/SdSqXwg/ccn-dental-care-oral-checks-w-640-fm-jpg-auto-compress.jpg',
		alt: 'Perro siendo atendido en la veterinaria.',
	},
	{
		title: 'GERIATRÍA VETERINARIA',
		content: 'Atención para tus mascotas en edad mas avanzada.',
		src: 'https://images.unsplash.com/photo-1554456854-55a089fd4cb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
		alt: 'Perro mirando a la cámara.',
	},
];

export const Servicios = () => {
	return (
		<div className='bg-black  w-100'>
			<Carousel className='Carousel container-lg' data-bs-theme='light'>
				{servicesContent.map((service) => (
					<Carousel.Item key={service.alt} className='c-item'>
						<div className='container-carousel'>
							<img
								className='d-block h-100 w-100 object-fit-cover'
								src={service.src}
								alt={service.alt}
							/>
						</div>
						<Carousel.Caption>
							<div className='text-start'>
								<h5 className='fw-bold display-5 fs-3'>{service.title}</h5>
								<p className='display-6 fs-3'>{service.content}</p>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	);
};
