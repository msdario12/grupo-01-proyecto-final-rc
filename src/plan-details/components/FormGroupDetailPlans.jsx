import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { vetPlans } from '../../../vetPlansDB';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputWithFeedback } from '../elements/InputWithFeedback';

// Opciones del select de especie de animales
const animalsSpecies = [
	{ value: 'cat', name: 'Gato' },
	{ value: 'dog', name: 'Perro' },
	{ value: 'turtle', name: 'Tortuga' },
	{ value: 'rabbit', name: 'Conejo' },
	{ value: 'bird', name: 'Ave' },
	{ value: 'other', name: 'Otro' },
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
		.test(
			'noEOrSign', // type of the validator (should be unique)
			'Sólo números.', // error message
			(value) => typeof value === 'number' && !/[eE+-]/.test(value.toString())
		)
		.required('Campo obligatorio'),
	petSpecie: Yup.string()
		.optional()
		.oneOf(animalsSpecies.map((animal) => animal.value)),
	petRace: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(40, 'Máximo de 40 caracteres')
		.matches(/^[aA-zZ\s]+$/, 'Sólo letras del alfabeto')
		.oneOf(animalsSpecies.map((animal) => animal.name))
		.optional(),
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
			petSpecie: '',
			petRace: '',
			planSelect: selectedPlan.name,
			consult: '',
		},
		validationSchema: consultFormSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});
	return (
		<div>
			<Card>
				<Card.Body>
					<Card.Title className='display-6 fw-bold'>
						Envíenos su consulta
					</Card.Title>
					<Form onSubmit={formik.handleSubmit}>
						<Row>
							<Form.Group as={Col} sm={12} md={6} className='mb-3'>
								<Form.Label>Nombre *</Form.Label>
								<InputWithFeedback
									type='text'
									placeholder='Juan'
									formik={formik}
									name={'userName'}
									props={{ maxLength: 40 }}
								/>
							</Form.Group>

							<Form.Group as={Col} sm={12} md={6} className='mb-3'>
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
						<Form.Group className='mb-3'>
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

						<Form.Group className='mb-3'>
							<Form.Label>Edad de tu mascota *</Form.Label>
							<Form.Control
								min={0}
								max={99}
								name='petAge'
								{...formik.getFieldProps('petAge')}
								type='number'
								placeholder='5'
							/>
							<InputWithFeedback
								type='number'
								placeholder='5'
								formik={formik}
								name={'petAge'}
								props={{ max: 99, min: 0 }}
							/>
						</Form.Group>
						<Row>
							<Form.Group as={Col} sm={12} md={6} className='mb-3'>
								<Form.Label>Especie de tu mascota</Form.Label>
								<Form.Select
									name='petSpecie'
									{...formik.getFieldProps('petSpecie')}
									className='mb-3'>
									<option>Selecciona uno</option>
									{animalsSpecies.map((animal) => (
										<option key={animal.value} value={animal.value}>
											{animal.name}
										</option>
									))}
								</Form.Select>
							</Form.Group>
							<Form.Group as={Col} sm={12} md={6} className='mb-3'>
								<Form.Label>Raza de tu mascota</Form.Label>
								<Form.Control
									maxLength={40}
									name='petRace'
									{...formik.getFieldProps('petRace')}
									type='text'
									placeholder='Chihuahua'
								/>
							</Form.Group>
						</Row>
						<Form.Group>
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

						<Form.Group className='mb-3'>
							<Form.Label>Escribe tu consulta *</Form.Label>
							<Form.Control
								maxLength={255}
								name='consult'
								{...formik.getFieldProps('consult')}
								as='textarea'
								type='text'
								style={{ height: 80 }}
								placeholder='Quisiera adquirir el Plan Primeros Pasos...'
							/>
						</Form.Group>

						<div className='d-flex justify-content-center'>
							<Button
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
		</div>
	);
};
