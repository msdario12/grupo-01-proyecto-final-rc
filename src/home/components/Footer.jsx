import './Footer.css';
import { Icon } from './Icon';
import {
	faFacebook,
	faInstagram,
	faTwitter,
	faWhatsapp,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
	return (
		<>
			<footer className='page-footer font-small blue pt-4 footer-container'>
				<div className='container text-center text-left'>
					<div className='row'>
						<div className='col-md-4 mt-md-0 mt-3'>
							<h5 className='text-uppercase'>Rolling Vet</h5>
							<p>Tu veterinaria de confianza</p>
						</div>

						<hr className='clearfix w-100 d-md-none pb-0' />

						<div className='col-md-4 mb-md-0 mb-3'>
							<h5 className='text-uppercase'>Redes Sociales</h5>
							<ul className='list-unstyled links-footer-container'>
								<li>
									<a href='#!'>
										{' '}
										<Icon icon={faInstagram} /> Instagram
									</a>
								</li>
								<li>
									<a href='#!'>
										<Icon icon={faFacebook} /> Facebook
									</a>
								</li>
								<li>
									<a href='#!'>
										<Icon icon={faTwitter} /> Twitter
									</a>
								</li>
								<li>
									<a href='#!'>
										<Icon icon={faYoutube} /> Youtube
									</a>
								</li>
							</ul>
						</div>

						<div className='col-md-4 mb-md-0 mb-3'>
							<h5 className='text-uppercase'>Ubicacion</h5>
							<ul className='list-unstyled links-footer-container'>
								<li>
									<a href='#!'>
										<Icon icon={faLocationDot} /> General Paz 576
									</a>
								</li>
								<li>
									<a href='#!'>
										<Icon icon={faWhatsapp} /> +54 381 1234567
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className='footer-copyright text-center py-3 links-footer-container'>
					© 2023 Copyright:
					<a href='#'> RollingVet.com</a>
				</div>
			</footer>
		</>
	);
};
