import { Button, Form, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { PatientInputWithSuggestions } from './PatientInputWithSuggestions';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { turnSchema } from '../schema-validations/turnSchema';
import { ToastContext } from '../../context/ToastContext';
import { CustomAlertResponse } from './CustomAlertResponse';
import { HeaderTitleDashboard } from '../elements/HeaderTitleDashboard';
import { TurnsInputForm } from './TurnsInputForm';
import { PatientInfoCard } from './PatientInfoCard';

export const vetList = ['Juarez', 'Alvarez', 'Rodriguez'];

const newTurnSchema = Yup.object({ ...turnSchema });

export const TurnsForm = ({ modalMode = false }) => {
	const location = useLocation();
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState('init');
	const { privateBackendAPI } = useAxiosPrivate();
	const { addToast } = useContext(ToastContext);
	const [showAlert, setShowAlert] = useState(false);
	const [response, setResponse] = useState({ success: true });
	const [selectedPatient, setSelectedPatient] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			multiSearch: '',
			vet: 'placeholder',
			turnDate: new Date(),
			details: '',
		},
		validationSchema: newTurnSchema,
		onSubmit: (values) => {
			const castValues = newTurnSchema.cast(values);
			castValues.patient_id = selectedPatient._id;
			castValues.date = castValues.turnDate.toISOString();
			setIsLoading(true);
			privateBackendAPI
				.post('/api/turns', castValues)
				.then((res) => {
					addToast({
						variant: 'success',
						message: 'Turno creado correctamente',
					});
					console.log(res);
					formik.resetForm();
					setIsUserInfoLoaded(false);
					setIsLoading(false);
					setSelectedPatient();
					if (location?.state?.patient) {
						location.state = {};
					}
					formik.resetForm();
				})
				.catch((e) => {
					console.log(e);
					if (e.response.data.errors) {
						const { errors } = e.response.data;
						const errorList = (
							<ul>
								{errors.map((e) => (
									<li key={e.value}>{e.msg}</li>
								))}
							</ul>
						);
						addToast({
							variant: 'error',
							message: errorList,
						});
						setResponse({
							success: false,
							message: errorList,
						});
						setShowAlert(true);
						setIsLoading(false);

						return;
					}
					addToast({
						variant: 'error',
						message: 'Error al crear el turno -' + e?.response?.data?.message,
					});
					setResponse(e?.response?.data);
					setShowAlert(true);
					setIsLoading(false);
				});
		},
	});

	useEffect(() => {
		if (location?.state?.patient) {
			console.log(location?.state?.patient);
			const patientID = location?.state?.patient._id;
			privateBackendAPI
				.get(`/api/patients/${patientID}?populate=true`)
				.then((res) => {
					console.log(res);
					const { _id } = res.data.data;
					const { name, race, specie } = res.data.data.pet_id;
					const { firstName, lastName, phone, email } = res.data.data.user_id;
					setSelectedPatient({
						_id,
						firstName,
						lastName,
						phone,
						email,
						name,
						race,
						specie,
					});
					setIsUserInfoLoaded(true);
					formik.values.multiSearch = email;
					formik.setFieldTouched('multiSearch', true);
					setIsLoading(false);
				});
		}
	}, [location]);

	const handleClickSuggestion = (suggestion) => {
		setSelectedPatient(suggestion);
		console.log(suggestion);
		setIsUserInfoLoaded(true);

		formik.values.multiSearch = suggestion.email;
		formik.setFieldTouched('multiSearch', true);
	};

	return (
		<div className='d-flex flex-column gap-4'>
			{!modalMode ? (
				<HeaderTitleDashboard
					title={'Crear turnos'}
					subtitle={'Busca un paciente existente o crea uno.'}
				/>
			) : (
				''
			)}
			<Form onSubmit={formik.handleSubmit}>
				<Form.Group className='mb-3' controlId='multiSearch'>
					<Form.Label>
						Ingresa el nombre de la mascota, o del dueño o el correo electrónico
					</Form.Label>
					<PatientInputWithSuggestions
						formik={formik}
						setIsUserInfoLoaded={setIsUserInfoLoaded}
						handleClickSuggestion={handleClickSuggestion}
						name={'multiSearch'}
						fieldsToRender={[
							{ name: 'name', title: 'Mascota' },
							{ name: 'email', title: 'Email' },
							{ name: 'firstName', title: 'Nombre' },
						]}
						endPoint='/api/patients'
						queryName='searchParam'
						hasTextCapitalization={false}
						placeholder={'Introduzca el nombre, email o nombre de la mascota'}
					/>
				</Form.Group>
				{!isUserInfoLoaded ? (
					<div className='mb-3 d-flex flex-column'>
						<p>
							No se encuentra un paciente con el criterio ingresado, por favor
							crea uno nuevo en la siguiente página. Serás redirigido
							automáticamente al finalizar la creación del nuevo paciente.
						</p>
						<Button
							as={Link}
							to={'../add-patient'}
							state={{ prevUrl: location, backToTurns: true }}>
							Crear paciente
						</Button>
					</div>
				) : (
					<div className='mb-3'>
						{selectedPatient ? (
							<>
								<h3 className='mb-lg-4 mb-3'>Datos del paciente</h3>
								<PatientInfoCard selectedPatient={selectedPatient} />
								<h3 className='mb-lg-4 mb-3'>Formulario del turno</h3>
								<TurnsInputForm formik={formik} />
								<CustomAlertResponse
									response={response}
									showAlert={showAlert}
								/>
								<div className='d-flex'>
									<Button
										className='px-4 py-2 w-100'
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
											'Crear turno'
										)}
									</Button>
								</div>
							</>
						) : (
							''
						)}
					</div>
				)}
			</Form>
		</div>
	);
};
