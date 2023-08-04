import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Servicios.css";


export const Servicios = () => {
	return (
		<>

<h2 className='bb'>Nuestros Servicios </h2>

    <Carousel className= "Carousel"  data-bs-theme="dark">
      <Carousel.Item  className='c-item' >
        <img
          className="d-block w-100   .c-img "
          src="https://i.ibb.co/v1Xk18b/pexels-photo-6235233.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item className='c-item' >
        <img
          className="d-block w-100   .c-img"
          src="https://i.ibb.co/vHcn187/pexels-photo-6235663.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      
      <Carousel.Item className='c-item'  >
        <img
          className="d-block w-100   .c-img "
          src="https://i.ibb.co/JWLJnqL/pexels-photo-6816869.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className='c-item'>
        <img
          className="d-block w-100    .c-img"
          src="https://i.ibb.co/N6skH6W/pexels-photo-6816861.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item   className='c-item'>
        <img
          className="d-block w-100   .c-img "
          src="https://i.ibb.co/kctqMRW/pexels-photo-7474852.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>

		</>
	);
};
