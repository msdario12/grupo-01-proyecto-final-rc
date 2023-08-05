import { useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '../../context/ModalContext';
import { RedirectLoginModal } from './RedirectLoginModal';
import { useLocation, useNavigate } from 'react-router';

export const GenericModal = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
	// Manejo del modal
	const handleClose = () => setIsModalOpen(false);
	useEffect(() => {
		if (!isModalOpen) {
			return;
		}
		const timeoutID = setTimeout(() => {
			navigate('/login', { state: { prevUrl: location }, replace: true }); //aca se tiene que redirigir al login
			setIsModalOpen(false);
		}, 5000);
		return () => {
			clearTimeout(timeoutID);
		};
	}, [isModalOpen]);

	return (
		<Modal show={isModalOpen} onHide={handleClose}>
			<RedirectLoginModal handleClose={handleClose} />
		</Modal>
	);
};
