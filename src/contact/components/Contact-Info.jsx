import { Icon } from '../../home/components/Icon';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

export const ContactInfo = () => {
	return (
		<>
			<div className='contact-container'>
				<div className='text-center mt-5'>
					<h2 className='title-contact'>Contactamos</h2>
					<p className='contet-contact'>
						Si deseas una consulta gratuita online para tus mascotas, puedes
						contactarte a nuestras diversas redes sociales, llegándote a nuestro
						local o rellenando el formulario.
					</p>
					<p className='contet-contact'>
						WhatsApp <Icon icon={faWhatsapp} /> +54 381 1234567
					</p>
					<p className='contet-contact'>
						<Icon icon={faEnvelope} /> rollingvetconsultas@rollingvet.com
					</p>
					<p className='contet-contact'>
						<Icon icon={faLocationDot} /> General Paz 576
					</p>
				</div>
			</div>
		</>
	);
};
