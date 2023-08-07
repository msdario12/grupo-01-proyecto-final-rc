import { Button, Form, FormControl } from 'react-bootstrap';
import { useFormik } from 'formik';
import { PatientInputWithSuggestions } from './PatientInputWithSuggestions';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { InputWithFeedback } from '../../plan-details/elements/InputWithFeedback';
import 'react-datepicker/dist/react-datepicker.css';
import { getDay, setHours, setMinutes } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';

const vetList = ['Juarez', 'Alvarez', 'Rodriguez'];

export const TurnsForm = () => {
	const location = useLocation();
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState('init');
	const { privateBackendAPI } = useAxiosPrivate();
	const formik = useFormik({
		initialValues: {
			multiSearch: '',
			vet: 'placeholder',
			date: new Date(),
			details: '',
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});

	useEffect(() => {
		if (location?.state?.patient_id) {
			privateBackendAPI
				.get(`/api/patients/${location.state.patient_id}`)
				.then((res) => console.log(res));
		}
	}, [location]);

	const isWeekday = (date) => {
		const day = getDay(date);
		return day !== 0 && day !== 6;
	};

	const filterPassedTime = (time) => {
		const openMorning = setHours(new Date(time), 8);
		const closeMorning = setHours(new Date(time), 12);
		const openAfternoon = setHours(new Date(time), 16);
		const closeAfternoon = setHours(new Date(time), 20);
		const selectedDate = new Date(time);

		const morningCheck =
			selectedDate.getTime() > openMorning.getTime() &&
			selectedDate.getTime() < closeMorning.getTime();
		const afternoonCheck =
			selectedDate.getTime() > openAfternoon.getTime() &&
			selectedDate.getTime() < closeAfternoon.getTime();

		return morningCheck || afternoonCheck;
	};

	const handleClickSuggestion = (suggestion) => {
		setIsUserInfoLoaded(true);
	};

	return (
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
				<Button
					as={Link}
					to={'../add-patient'}
					state={{ prevUrl: location, backToTurns: true }}>
					Crear paciente
				</Button>
			) : (
				<div>
					<Form.Group className='mb-3' controlId='vet'>
						<Form.Label>Veterinario para el turno *</Form.Label>
						<Form.Select
							name='vet'
							{...formik.getFieldProps('vet')}
							isValid={!formik.errors.specie && formik.touched.specie}
							isInvalid={formik.errors.specie && formik.touched.specie}>
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
					<Form.Group className='mb-3 d-flex gap-3' controlId='date'>
						<Form.Label>Selecciona la fecha y hora para el turno *</Form.Label>
						{/* <ReactDatePicker
							name='date'
							isClearable
							showIcon
							autoComplete='off'
							minDate={new Date()}
							selected={formik.values.date}
							onChange={(date) => formik.setFieldValue('date', date)}
							onBlur={formik.handleBlur}
							value={formik.values.date}
							filterDate={isWeekday}
							placeholderText='Select a weekday'
							showTimeSelect
							filterTime={filterPassedTime}
							dateFormat='PPp'
							locale={es}
						/> */}
						<FormControl
							as={ReactDatePicker}
							name='date'
							isClearable
							showIcon
							autoComplete='off'
							minDate={new Date()}
							selected={formik.values.date}
							onChange={(date) => formik.setFieldValue('date', date)}
							onBlur={formik.handleBlur}
							value={formik.values.date}
							filterDate={isWeekday}
							placeholderText='Select a weekday'
							showTimeSelect
							filterTime={filterPassedTime}
							dateFormat='PPp'
							locale={es}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.specie}
						</Form.Control.Feedback>
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
					<Button type='submit'>Enviar</Button>
				</div>
			)}
		</Form>
	);
};
