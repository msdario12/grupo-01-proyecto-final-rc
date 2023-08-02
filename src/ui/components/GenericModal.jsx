// Modal
import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '../../context/ModalContext';

export const GenericModal = () => {
	const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

	// Manejo del modal
	const handleClose = () => setIsModalOpen(false);
	const handleShow = () => setIsModalOpen(true);
	return (
		<>
			<Modal show={isModalOpen} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</>
	);
};
