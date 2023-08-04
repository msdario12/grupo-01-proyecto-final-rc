import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Servicios.css";


export const Servicios = () => {
	return (
		<>

<h2 >Nuestros Servicios </h2>

    <Carousel className= "Carousel"  data-bs-theme="dark">
      <Carousel.Item  className='c-item' >
        <img 
          className="d-block w-100   c-img "
          src="https://i.ibb.co/v1Xk18b/pexels-photo-6235233.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>EXAMENES MEDICOS COMPLETOS </h5>
          <p>Consulta medica general, problemas de piel, perros y/o gatos con sintomas de vomitos y diarrea. Dermatogologia</p>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item className='c-item' >
        <img
          className="d-block w-100   c-img"
          src="https://i.ibb.co/vHcn187/pexels-photo-6235663.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>MONITOREO CARDIACO Y RESPIRATORIO</h5>
          <p>Servicio de electrocardiograma y diagnóstico cardiológico.</p>
        </Carousel.Caption>
      </Carousel.Item>

      
      <Carousel.Item className='c-item'  >
        <img
          className="d-block w-100   c-img "
          src="https://i.ibb.co/JWLJnqL/pexels-photo-6816869.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>VACUNAS Y REFUERZOS</h5>
          <p>
          Plan de vacunación para cachorros y adultos. Quintuple, sextuple, antirrabica, triple felina, leucemia felina.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className='c-item'>
        <img
          className="d-block w-100    c-img"
          src="https://i.ibb.co/SdSqXwg/ccn-dental-care-oral-checks-w-640-fm-jpg-auto-compress.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>CUIDADO DENTAL</h5>
          <p>
          El cuidado de sus dientes debe empezar cuando aun es cachorro. Esto te permitirá educarlo correctamente para permitir el cepillado y las inspecciones que deba realizar su veterinario.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item   className='c-item'>
        <img
          className="d-block w-100   c-img "
          src="https://i.ibb.co/hKSjNSK/ed62h-how-your-dog-s-nutrition-needs-change-with-age-hero-dog-w-1280-fm-jpg-auto-compress.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>GERIATRIA VETERINARIA</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>

		</>
	);
};
