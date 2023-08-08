import { Button, Form, FormControl, Card, Col, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { PatientInputWithSuggestions } from './PatientInputWithSuggestions';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { InputWithFeedback } from '../../plan-details/elements/InputWithFeedback';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import ReactDatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import {
	filterPassedTime,
	isWeekday,
	turnSchema,
} from '../schema-validations/turnSchema';
import { ToastContext } from '../../context/ToastContext';
import { CustomAlertResponse } from './CustomAlertResponse';
import { HeaderTitleDashboard } from '../elements/HeaderTitleDashboard';

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
			date: '',
			details: '',
		},
		validationSchema: newTurnSchema,
		onSubmit: (values) => {
			const castValues = newTurnSchema.cast(values);
			castValues.patient_id = selectedPatient._id;
			castValues.date = castValues.turnDate.toISOString();
			console.log(values);
			formik.resetForm();
			setSelectedPatient();
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
				})
				.catch((e) => {
					console.log(e);
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
		<div>
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
							crea uno nuevo
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
								<Card className='mb-3'>
									<Card.Body className='row'>
										<Col>
											<div>
												<span className='text-uppercase fw-bold'>nombre: </span>
												<span className='text-capitalize'>
													{selectedPatient.firstName}
												</span>
											</div>
											<div>
												<span className='text-uppercase fw-bold'>
													apellido:{' '}
												</span>
												<span className='text-capitalize'>
													{selectedPatient.lastName}
												</span>
											</div>
											<div>
												<span className='text-uppercase fw-bold'>email: </span>
												<span>{selectedPatient.email}</span>
											</div>
										</Col>
										<Col>
											<div>
												<span className='text-uppercase fw-bold'>
													Mascota:{' '}
												</span>
												<span>{selectedPatient.name}</span>
											</div>
											<div>
												<span className='text-uppercase fw-bold'>
													Especie:{' '}
												</span>
												<span>{selectedPatient.specie}</span>
											</div>
										</Col>
									</Card.Body>
								</Card>
							</>
						) : (
							''
						)}
						<h3 className='mb-lg-4 mb-3'>Formulario del turno</h3>
						<Form.Group className='mb-3' controlId='vet'>
							<Form.Label>Veterinario para el turno *</Form.Label>
							<Form.Select
								name='vet'
								{...formik.getFieldProps('vet')}
								isValid={!formik.errors.vet && formik.touched.vet}
								isInvalid={formik.errors.vet && formik.touched.vet}>
								<option disabled value={'placeholder'}>
									Selecciona un veterinario
								</option>
								{vetList.map((vet) => (
									<option key={vet} value={vet}>
										{vet}
									</option>
								))}
							</Form.Select>
							<Form.Control.Feedback type='invalid'>
								{formik.errors.vet}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group
							className='mb-3 d-flex gap-3 align-items-center'
							controlId='turnDate'>
							<Form.Label>
								Selecciona la fecha y hora para el turno *
							</Form.Label>
							<FormControl
								as={ReactDatePicker}
								name='turnDate'
								isClearable
								showIcon
								autoComplete='off'
								minDate={new Date()}
								selected={formik.values.turnDate}
								onChange={(value) => formik.setFieldValue('turnDate', value)}
								onBlur={formik.handleBlur}
								value={formik.values.turnDate}
								filterDate={isWeekday}
								placeholderText='Fecha y hora'
								showTimeSelect
								filterTime={filterPassedTime}
								dateFormat='PPp'
								locale={es}
								isValid={!formik.errors.turnDate && formik.touched.turnDate}
								isInvalid={formik.errors.turnDate}
							/>
							<Form.Control.Feedback type='invalid'>
								{formik.errors.turnDate}
							</Form.Control.Feedback>
							<span className='text-danger'>{formik.errors.turnDate}</span>
						</Form.Group>
						<Form.Group className='mb-3' controlId='details'>
							<Form.Label>Detalles del turno *</Form.Label>
							<InputWithFeedback
								hasTextCapitalization={false}
								type='text'
								placeholder='Notas sobre el estado del paciente, síntomas, etc...'
								formik={formik}
								name={'details'}
								props={{
									maxLength: 255,
									style: { height: 80 },
									as: 'textarea',
								}}
							/>
						</Form.Group>
						<CustomAlertResponse response={response} showAlert={showAlert} />
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
					</div>
				)}
			</Form>
		</div>
	);
};
