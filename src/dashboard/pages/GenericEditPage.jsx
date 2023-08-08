import { Modal } from 'react-bootstrap';
import { UserEditForm } from '../components/UserEditForm';
import { createContext, useContext, useEffect, useState } from 'react';
import { PetEditForm } from '../components/PetEditForm';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { ToastContext } from '../../context/ToastContext';

export const GenericEditPageContext = createContext();

export const GenericEditPage = (props) => {
	const [data, setData] = useState();
	const { privateBackendAPI } = useAxiosPrivate();
	const { addToast } = useContext(ToastContext);
	useEffect(() => {
		privateBackendAPI
			.get(`${props.endPoint + props.selectedPatientID}`)
			.then((res) => {
				console.log(res.data);
				setData(res.data.data);
			})
			.catch((e) => {
				console.error(e);

				addToast({
					message: 'Error al recibir los datos' + e,
					variant: 'error',
				});
			});
	}, [props.selectedPatientID]);
	if (!data) {
		return '';
	}
	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					{props.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<GenericEditPageContext.Provider value={{ data }}>
					{props.children}
				</GenericEditPageContext.Provider>
			</Modal.Body>
		</Modal>
	);
};
