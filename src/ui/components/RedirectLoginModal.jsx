import { Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';

export const RedirectLoginModal = ({ handleClose }) => {
	const navigate = useNavigate();
	const location = useLocation();
	// Cambiar la redireccion al login en vez del home
	const handleClick = () => {
		navigate('/', { state: { prevUrl: location }, replace: true });
		handleClose();
	};
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Autenticación necesaria</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Para acceder a la sección que quieres visitar necesita autenticarse.
				Serás redirigido en breve
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' className='px-4 py-2' onClick={handleClick}>
					Ir al Login
				</Button>
			</Modal.Footer>
		</>
	);
};
