import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { userSchema } from '../../schema-validations/userSchema';
import { petSchema } from '../../schema-validations/petSchema';
import { ToastContext } from '../../../context/ToastContext';
import { HeaderTitleDashboard } from '../../elements/HeaderTitleDashboard';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router';
import { PetInputsForm } from './PetInputsForm';
import { UsersInputsForm } from './UsersInputsForm';
import { CustomAlertResponse } from '../../ui/components/CustomAlertResponse';

const patientSchema = Yup.object({
	...userSchema,
	...petSchema,
});

export const NewPatientForm = ({
	title = 'Agregar paciente',
	modalMode = false,
}) => {
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);
	const [redirectToTurns, setRedirectToTurns] = useState(false);
	const { addToast } = useContext(ToastContext);
	const { privateBackendAPI } = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();
	const [showAlert, setShowAlert] = useState(false);
	const [response, setResponse] = useState({ success: true });
	const [isLoading, setIsLoading] = useState(false);
	useDocumentTitle(title);
	const initialValues = {
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		name: '',
		specie: 'placeholder',
		race: '',
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: patientSchema,

		onSubmit: (values) => {
			// Logica para enviar informacion al backend
			const castValues = patientSchema.cast(values);

			setIsLoading(true);
			privateBackendAPI
				.post('/api/patients', castValues)
				.then((res) => {
					addToast({
						variant: 'success',
						message: 'Paciente creado correctamente',
					});

					formik.resetForm();
					setIsUserInfoLoaded(false);
					setIsLoading(false);
					if (redirectToTurns) {
						navigate('../turns', { state: { patient: res.data.data } });
					}
				})
				.catch((e) => {
					addToast({
						variant: 'error',
						message:
							'Error al crear el paciente -' + e?.response?.data?.message,
					});
					setResponse(e?.response?.data);
					setShowAlert(true);
					setIsLoading(false);
				});
		},
	});

	useEffect(() => {
		if (location?.state?.backToTurns) {
			setRedirectToTurns(true);
		}
	}, [location?.state?.backToTurns]);

	return (
		<div>
			{!modalMode ? (
				<HeaderTitleDashboard
					title={'Añadir paciente'}
					subtitle={'Busca un email existente o crea uno.'}
				/>
			) : (
				''
			)}

			<Card className={modalMode ? 'border-0' : ''}>
				<Card.Body>
					<Form
						onSubmit={formik.handleSubmit}
						onFocus={() => setShowAlert(false)}>
						<Row className='mb-lg-3 mb-1'>
							<Col sm={12} lg={6}>
								<h3 className='mb-lg-4 mb-3'>Datos del dueño</h3>
								<UsersInputsForm
									formik={formik}
									setIsUserInfoLoaded={setIsUserInfoLoaded}
									isUserInfoLoaded={isUserInfoLoaded}
								/>
							</Col>
							<Col sm={12} lg={6}>
								<h3 className='mb-lg-4 mb-3'>Datos de la mascota</h3>
								<PetInputsForm formik={formik} />
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
									'Crear paciente'
								)}
							</Button>
							<Button
								disabled={isLoading}
								className='px-4 py-2'
								variant={'danger'}
								size='md'
								onClick={() => {
									formik.resetForm();
									setIsUserInfoLoaded(false);
								}}
								type='button'>
								Limpiar
							</Button>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};
