import { Modal } from 'react-bootstrap';
import { GenericEditPageProvider } from '../../context/GenericEditPageProvider';

export const GenericEditPage = (props) => {
	return (
		<Modal
			onHide={props.onHide}
			show={props.show}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					{props.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<GenericEditPageProvider props={props}>
					{props.children}
				</GenericEditPageProvider>
			</Modal.Body>
		</Modal>
	);
};
