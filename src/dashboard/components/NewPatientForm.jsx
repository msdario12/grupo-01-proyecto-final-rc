import {
	Button,
	Card,
	Col,
	Dropdown,
	DropdownButton,
	Form,
	FormControl,
	InputGroup,
	ListGroup,
	Row,
} from 'react-bootstrap';
import { InputWithFeedback } from '../../plan-details/elements/InputWithFeedback';
import { useFormik } from 'formik';
import { animalsSpecies } from '../../plan-details/components/FormGroupDetailPlans';
import { useState } from 'react';

export const NewPatientForm = () => {
	const formik = useFormik({
		initialValues: {
			userName: '',
			lastName: '',
			email: '',
			phone: '',
			petSpecie: 'placeholder',
			petRace: '',
		},

		onSubmit: (values) => {
			console.log(values);
			// Logica para enviar informacion al backend
			// const castValues = productSchema.cast(values);
			// console.log(castValues);
			// const { name, price, description } = castValues;

			// const res = await addProductToDB(name, price, description);
			// getProductsFromDB();
			// alert(JSON.stringify(values, null, 2));
			formik.resetForm();
		},
	});
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	const onChangeEmail = (e) => {
		if (e.target.value.length >= 3) {
			setIsDropDownOpen(true);
		}
	};

	return (
		<Card>
			<Card.Body>
				<Card.Title className='display-6 fw-bold'>
					Crear nuevo paciente
				</Card.Title>
				<Form onSubmit={formik.handleSubmit}>
					<InputGroup
						className='mb-3'
						onChange={onChangeEmail}
						onBlur={() => setIsDropDownOpen(false)}>
						<Form.Control aria-label='Text input with dropdown button' />

						<DropdownButton
							onChange={() => setIsDropDownOpen((prev) => !prev)}
							drop='down-centered'
							show={isDropDownOpen}
							variant='outline-primary'
							title=''
							align='start'>
							<Dropdown.Item>Action</Dropdown.Item>
							<Dropdown.Item>Another action</Dropdown.Item>
							<Dropdown.Item>Something else here</Dropdown.Item>
						</DropdownButton>
					</InputGroup>

					<Row>
						<Form.Group
							as={Col}
							sm={12}
							md={6}
							className='mb-3'
							controlId='userName'>
							<Form.Label>Nombre *</Form.Label>
							<InputWithFeedback
								type='text'
								placeholder='Juan'
								formik={formik}
								name={'userName'}
								props={{ maxLength: 40 }}
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
								props={{ maxLength: 40 }}
							/>
						</Form.Group>
					</Row>

					<Form.Group className='mb-3' controlId='phone'>
						<Form.Label>Número de teléfono *</Form.Label>
						<InputWithFeedback
							type='tel'
							placeholder='38135222115'
							formik={formik}
							name={'phone'}
							props={{ maxLength: 15 }}
						/>

						<Form.Text className='text-muted'>
							Asegúrese de ingresar un correo valido ya que nos comunicaremos
							con usted por ese medio.
						</Form.Text>
					</Form.Group>

					<Form.Group as={Col} sm={12} md={6} className='mb-3' controlId='name'>
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
							controlId='petSpecie'>
							<Form.Label>Especie de tu mascota *</Form.Label>
							<Form.Select
								name='petSpecie'
								{...formik.getFieldProps('petSpecie')}
								className='mb-3'
								isValid={!formik.errors.petSpecie && formik.touched.petSpecie}
								isInvalid={formik.errors.petSpecie}>
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
								{formik.errors.petSpecie}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group
							as={Col}
							sm={12}
							md={6}
							className='mb-3'
							controlId='petRace'>
							<Form.Label>Raza de tu mascota</Form.Label>

							<InputWithFeedback
								type='text'
								placeholder='O una descripción'
								formik={formik}
								name={'petRace'}
								props={{ maxLength: 40 }}
							/>
						</Form.Group>
					</Row>

					<div className='d-flex justify-content-center'>
						<Button
							disabled={!formik.isValid}
							variant='primary'
							size='md'
							type='submit'
							className='w-50'>
							Enviar
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
};
