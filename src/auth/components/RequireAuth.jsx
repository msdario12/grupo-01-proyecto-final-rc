import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
// Modal
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalExample({}) {
	const [show, setShow] = useState(true);

	// Manejo del modal
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</>
	);
}

// Con esto redireccionamos en caso de no contar con
// los permisos para ir a la ruta protegida

// El state y replace nos permite poder volver a la ultima pagina donde estaba el usuario

// Podemos recibir el rol que es admitido y luego chequear si el rol existe para acceder

export const RequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();

	return auth?.user ? (
		<Outlet />
	) : (
		<Navigate to='/' state={{ from: location }} replace />
	);
};
