import {
	Button,
	Card,
	Col,
	Form,
	InputGroup,
	ListGroup,
	Row,
} from 'react-bootstrap';
import { InputWithFeedback } from '../../plan-details/elements/InputWithFeedback';
import { useFormik } from 'formik';
import { animalsSpecies } from '../../plan-details/components/FormGroupDetailPlans';
import { useState } from 'react';
import { backendAPI } from '../../api/backendAPI';
import * as Yup from 'yup';

const patientSchema = Yup.object({
	firstName: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[a-zA-Z0-9]*$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	lastName: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[a-zA-Z0-9]*$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	email: Yup.string()
		.email('Introduzca un email valido')
		.required('Campo obligatorio'),
	phone: Yup.string()
		.matches(
			// eslint-disable-next-line no-useless-escape
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
			'Introduce un número de teléfono válido'
		)
		.min(3, 'Mínimo de 3 caracteres')
		.max(15, 'Máximo de 15 caracteres')
		.required('Campo obligatorio'),
	name: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[a-zA-Z0-9]*$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	specie: Yup.string()
		.required('Campo obligatorio')
		.oneOf(
			animalsSpecies.map((animal) => animal.value),
			'Selecciona una especie de la lista'
		),
	race: Yup.string()
		.required('Campo obligatorio')
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[a-zA-Z0-9]*$/, 'Sólo letras del alfabeto'),
});

export const NewPatientForm = () => {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);
	const [suggestionList, setSuggestionList] = useState();

	const formik = useFormik({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			name: '',
			specie: 'placeholder',
			race: '',
		},
		validationSchema: patientSchema,

		onSubmit: (values) => {
			// Logica para enviar informacion al backend
			const castValues = patientSchema.cast(values);
			backendAPI
				.post('/api/patients', castValues)
				.then((res) => console.log(res));

			formik.resetForm();
			setIsUserInfoLoaded(false);
		},
	});

	const handleChangeEmail = (e) => {
		const value = e.target.value;
		if (e.target.value.length >= 3) {
			setIsDropDownOpen(true);
			backendAPI.get('/api/users', { params: { email: value } }).then((res) => {
				if (!res.data.data) {
					setSuggestionList();
					setIsUserInfoLoaded(false);
					return;
				}
				setSuggestionList(res.data.data);
			});
		} else {
			setIsDropDownOpen(false);
			setIsUserInfoLoaded(false);
		}
	};

	const handleFocusEmail = (e) => {
		const value = e.target.value;
		if (value.length >= 3) {
			setIsDropDownOpen(true);
		}
	};

	const handleClickSuggestion = (suggestion) => {
		console.log(suggestion);
		console.log(formik);
		setIsUserInfoLoaded(true);
		formik.values.email = suggestion.email;
		formik.values.firstName = suggestion.firstName;
		formik.setFieldTouched('firstName', true);

		formik.values.lastName = suggestion.lastName;
		formik.setFieldTouched('lastName', true);

		formik.values.phone = suggestion.phone;
		formik.setFieldTouched('phone', true);
	};
	const handleBlur = () => {
		setTimeout(() => setIsDropDownOpen(false), 150);
	};

	const cleanEmailClick = () => {
		setIsUserInfoLoaded(false);
		formik.values.email = '';
		formik.setFieldTouched('email', false);
	};
	return (
		<Card>
			<Card.Body>
				<Form onSubmit={formik.handleSubmit}>
					<Form.Group className='mb-3' controlId='email'>
						<Form.Label>Email *</Form.Label>
						<InputGroup
							className='mb-3 d-flex flex-column'
							onChange={handleChangeEmail}
							onFocus={handleFocusEmail}
							onBlur={handleBlur}
							autoComplete='off'>
							<div className='d-flex'>
								<InputWithFeedback
									hasTextCapitalization={false}
									noFeedback={true}
									type='text'
									placeholder='Busque un email'
									formik={formik}
									name={'email'}
									props={{ maxLength: 40, autoComplete: 'new-password' }}
								/>

								<Button
									type='button'
									variant='outline-secondary'
									onClick={cleanEmailClick}>
									Borrar
								</Button>
							</div>
							<ListGroup
								className={`shadow-lg w-100 ${
									isDropDownOpen ? 'position-absolute' : 'd-none'
								}`}
								style={{ top: 37 }}>
								{!suggestionList ? (
									<ListGroup.Item>No existe el email buscado</ListGroup.Item>
								) : (
									suggestionList.map((suggestion) => (
										<ListGroup.Item
											type='button'
											key={suggestion._id}
											action
											onClick={() => handleClickSuggestion(suggestion)}>
											{suggestion.email}
										</ListGroup.Item>
									))
								)}
							</ListGroup>
						</InputGroup>
					</Form.Group>

					<Row>
						<Form.Group
							as={Col}
							sm={12}
							md={6}
							className='mb-3'
							controlId='firstName'>
							<Form.Label>Nombre *</Form.Label>
							<InputWithFeedback
								type='text'
								placeholder='Ramiro'
								formik={formik}
								name={'firstName'}
								props={{ maxLength: 40, disabled: isUserInfoLoaded }}
							/>
						</Form.Group>

						<Form.Group
							as={Col}
							sm={12}
							md={6}
							className='mb-3'
							controlId='lastName'>
							<Form.Label>Apellido *</Form.Label>
							<InputWithFeedback
								type='text'
								placeholder='Perez'
								formik={formik}
								name={'lastName'}
								props={{ maxLength: 40, disabled: isUserInfoLoaded }}
							/>
						</Form.Group>
					</Row>

					<Form.Group className='mb-3' controlId='phone'>
						<Form.Label>Número de teléfono *</Form.Label>
						<InputWithFeedback
							type='tel'
							onChange={(e) => console.log(e)}
							placeholder='38135222115'
							formik={formik}
							name={'phone'}
							props={{
								maxLength: 15,
								disabled: isUserInfoLoaded,
							}}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='name'>
						<Form.Label>Nombre de la mascota *</Form.Label>
						<InputWithFeedback
							type='text'
							placeholder='Roco'
							formik={formik}
							name={'name'}
							props={{ maxLength: 40 }}
						/>
					</Form.Group>

					<Row>
						<Form.Group
							as={Col}
							sm={12}
							md={6}
							className='mb-3'
							controlId='specie'>
							<Form.Label>Especie de tu mascota *</Form.Label>
							<Form.Select
								name='specie'
								{...formik.getFieldProps('specie')}
								className='mb-3'
								isValid={!formik.errors.specie && formik.touched.specie}
								isInvalid={formik.errors.specie && formik.touched.specie}>
								<option disabled value={'placeholder'}>
									Selecciona uno
								</option>
								{animalsSpecies.map((animal) => (
									<option key={animal.value} value={animal.value}>
										{animal.name}
									</option>
								))}
							</Form.Select>
							<Form.Control.Feedback type='invalid'>
								{formik.errors.specie}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group
							as={Col}
							sm={12}
							md={6}
							className='mb-3'
							controlId='race'>
							<Form.Label>Raza de tu mascota</Form.Label>

							<InputWithFeedback
								type='text'
								placeholder='O una descripción'
								formik={formik}
								name={'race'}
								props={{ maxLength: 40 }}
							/>
						</Form.Group>
					</Row>

					<div className='d-flex justify-content-center gap-3'>
						<Button
							className='px-4 py-2'
							disabled={!formik.isValid}
							variant='primary'
							size='md'
							type='submit'>
							Enviar
						</Button>
						<Button
							className='px-4 py-2'
							variant='danger'
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
	);
};
