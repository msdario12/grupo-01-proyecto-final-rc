import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import { UsersInputsForm } from '../../dashboard/patients/components/UsersInputsForm';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { userSchema } from '../../dashboard/schema-validations/userSchema';
import { petSchema } from '../../dashboard/schema-validations/petSchema';
import { useRef, useState } from 'react';
import { PetInputsForm } from '../../dashboard/patients/components/PetInputsForm';
import { TurnsInputForm } from '../../dashboard/turns/components/TurnsInputForm';
import { HeaderTitleDashboard } from '../../dashboard/elements/HeaderTitleDashboard';
import { turnEditSchema } from '../../dashboard/schema-validations/turnSchema';
import { CustomAlertResponse } from '../../dashboard/ui/components/CustomAlertResponse';

const turnReservationSchema = Yup.object({
	...userSchema,
	...petSchema,
	...turnEditSchema,
});

export const TurnReservationPage = ({ title }) => {
	useDocumentTitle(title);
	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState({
		success: true,
		message: '',
	});
	const [showAlert, setShowAlert] = useState(false);
	const form = useRef();

	const initialValues = {
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		name: '',
		specie: 'placeholder',
		race: '',
		vet: '',
		date: '',
		details: '',
	};
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: turnReservationSchema,
		onSubmit: () => {
			setIsLoading(true);
			emailjs
				.sendForm(
					'service_pzdzjgj',
					'template_s8mdv36',
					form.current,
					'IA7y8FZdE1Zr4Ky_M'
				)
				.then(
					() => {
						setShowAlert(true);
						setIsLoading(false);

						setResponse({
							success: true,
							message:
								'Se cargaron correctamente los datos de su turno. Un administrador le enviara mas detalles de su turno por email.',
						});
					},
					() => {
						setShowAlert(true);
						setIsLoading(false);

						setResponse({
							success: false,
							message: 'Hubo un error al enviar el mail.',
						});
					}
				);

			formik.resetForm();
		},
	});
	return (
		<main className='container-lg min-vh-100 d-flex flex-column justify-content-center my-3'>
			<HeaderTitleDashboard
				title={'Reserva tu turno'}
				subtitle={
					'Rellena el formulario para enviarle los datos a un administrador, este le responderá al email que proporcione sobre el estado de su turno.'
				}
			/>
			<Form onSubmit={formik.handleSubmit} ref={form}>
				<Row className='mb-lg-3 mb-1'>
					<Col sm={12} lg={6}>
						<h3 className='mb-lg-4 mb-3'>Datos del dueño</h3>
						<UsersInputsForm formik={formik} editMode={true} />
					</Col>
					<Col sm={12} lg={6}>
						<h3 className='mb-lg-4 mb-3'>Datos de la mascota</h3>
						<PetInputsForm formik={formik} />
					</Col>
					<Col>
						<h3 className='mb-lg-4 mb-3'>Datos del turno</h3>
						<TurnsInputForm formik={formik} />
					</Col>
				</Row>
				<CustomAlertResponse response={response} showAlert={showAlert} />

				<div className='d-flex justify-content-center gap-3'>
					<Button
						className='px-4 py-2'
						disabled={!formik.isValid || isLoading}
						variant={'primary'}
						size='md'
						type='submit'>
						{isLoading ? (
							<div>
								<Spinner
									as='span'
									animation='border'
									size='sm'
									role='status'
									aria-hidden='true'
								/>
								<span className='ms-2'>Cargando</span>
							</div>
						) : (
							'Enviar formulario'
						)}
					</Button>
					<Button
						disabled={isLoading}
						className='px-4 py-2'
						variant={'danger'}
						size='md'
						onClick={() => {
							formik.resetForm();
						}}
						type='button'>
						Limpiar
					</Button>
				</div>
			</Form>
		</main>
	);
};
