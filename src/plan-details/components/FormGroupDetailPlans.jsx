import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { vetPlans } from '../../../vetPlansDB';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputWithFeedback } from '../elements/InputWithFeedback';

// Opciones del select de especie de animales
export const animalsSpecies = [
	{ value: 'perro', name: 'Perro' },
	{ value: 'gato', name: 'Gato' },
	{ value: 'conejo', name: 'Conejo' },
	{ value: 'hámster', name: 'Hámster' },
	{ value: 'cobaya', name: 'Cobaya' },
	{ value: 'pájaro', name: 'Pájaro' },
	{ value: 'tortuga', name: 'Tortuga' },
	{ value: 'serpiente', name: 'Serpiente' },
	{ value: 'pez', name: 'Pez' },
	{ value: 'lagarto', name: 'Lagarto' },
];

// Esquema de validacion de Yup

const consultFormSchema = Yup.object({
	userName: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(40, 'Máximo de 40 caracteres')
		.matches(/^[aA-zZ\s]+$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	lastName: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(40, 'Máximo de 40 caracteres')
		.matches(/^[aA-zZ\s]+$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	email: Yup.string()
		.email('Introduzca una dirección de email valida')
		.required('Campo obligatorio'),
	petAge: Yup.number()
		.min(0, 'Solo valores positivos')
		.max(99, 'Máximo de 99 años')
		.required('Campo obligatorio')
		.test({
			name: 'noEOrSign', // type of the validator (should be unique)
			message: 'Sólo números', // error message
			test: (value) =>
				typeof value === 'number' && !/[eE+-]/.test(value.toString()),
		}),
	ageUnits: Yup.string(),
	petSpecie: Yup.string()
		.required('Campo obligatorio')
		.oneOf(
			animalsSpecies.map((animal) => animal.value),
			'Selecciona una especie de la lista'
		),
	petRace: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(40, 'Máximo de 40 caracteres')
		.matches(/^[aA-zZ\s]+$/, 'Sólo letras del alfabeto'),
	planSelect: Yup.string()
		.optional()
		.oneOf(vetPlans.map((plan) => plan.name)),
	consult: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(255, 'Máximo de 255 caracteres')
		.matches(/^[aA-zZ\s]+$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
});

export const FormGroupDetailPlans = ({ selectedPlan }) => {
	const formik = useFormik({
		initialValues: {
			userName: '',
			lastName: '',
			email: '',
			petAge: '',
			ageUnits: 'years',
			petSpecie: 'placeholder',
			petRace: '',
			planSelect: selectedPlan.name,
			consult: '',
		},
		validationSchema: consultFormSchema,
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
	return (
		<Card>
			<Card.Body>
				<Card.Title className='display-6 fw-bold'>
					Envíenos su consulta
				</Card.Title>
				<Form onSubmit={formik.handleSubmit}>
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
					<Form.Group className='mb-3' controlId='email'>
						<Form.Label>Correo Electrónico *</Form.Label>
						<InputWithFeedback
							type='email'
							placeholder='juanperez@example.com'
							formik={formik}
							name={'email'}
							props={{ maxLength: 80 }}
						/>

						<Form.Text className='text-muted'>
							Asegúrese de ingresar un correo valido ya que nos comunicaremos
							con usted por ese medio.
						</Form.Text>
					</Form.Group>

					<Row>
						<Form.Group
							as={Col}
							sm={12}
							md={6}
							className='mb-3'
							controlId='petAge'>
							<Form.Label>Edad de tu mascota *</Form.Label>
							<InputWithFeedback
								type='number'
								placeholder='Edad en años o meses'
								formik={formik}
								name={'petAge'}
								props={{ max: 99, min: 0, maxLength: 3 }}
								text={'Años'}
							/>
						</Form.Group>
						<Form.Group
							as={Col}
							sm={12}
							md={6}
							className='mb-3'
							controlId='ageUnits'>
							<Form.Label>¿Años o meses? *</Form.Label>
							<Form.Select
								isValid={!formik.errors.ageUnits && formik.touched.ageUnits}
								isInvalid={formik.errors.ageUnits}
								name='ageUnits'
								{...formik.getFieldProps('ageUnits')}
								className='mb-3'>
								<option value='years'>Año/s</option>
								<option value='months'>Mes/es</option>
							</Form.Select>
						</Form.Group>
					</Row>
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
					<Form.Group className='mb-3' controlId='planSelect'>
						<Form.Label>
							Selecciona el plan sobre el que quieres consultar
						</Form.Label>
						<Form.Select
							{...formik.getFieldProps('planSelect')}
							className='mb-3'
							name='planSelect'>
							{vetPlans.map((plan) => (
								<option key={plan.title} value={plan.name}>
									{plan.title}
								</option>
							))}
						</Form.Select>
					</Form.Group>

					<Form.Group className='mb-3' controlId='consult'>
						<Form.Label>Escribe tu consulta *</Form.Label>

						<InputWithFeedback
							type='text'
							placeholder='Quisiera adquirir el Plan Primeros Pasos...'
							formik={formik}
							name={'consult'}
							props={{
								maxLength: 255,
								style: { height: 80 },
								as: 'textarea',
							}}
						/>
					</Form.Group>

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
