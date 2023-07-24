import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { vetPlans } from '../../../vetPlansDB';
import { useFormik } from 'formik';

export const FormGroupDetailPlans = ({ selectedPlan }) => {
	const formik = useFormik({
		initialValues: {
			userName: '',
			lastName: '',
			email: '',
			petAge: '',
			petSpecie: '',
			petRace: '',
			planSelect: '',
			consult: '',
		},
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
								<Form.Control
									name='userName'
									{...formik.getFieldProps('userName')}
									type='text'
									placeholder='Juan'
								/>
							</Form.Group>
							<Form.Group as={Col} sm={12} md={6} className='mb-3'>
								<Form.Label>Apellido *</Form.Label>
								<Form.Control
									name='lastName'
									{...formik.getFieldProps('lastName')}
									type='text'
									placeholder='Perez'
								/>
							</Form.Group>
						</Row>
						<Form.Group className='mb-3'>
							<Form.Label>Correo Electrónico *</Form.Label>
							<Form.Control
								name='email'
								{...formik.getFieldProps('email')}
								type='email'
								placeholder='juan@example.com'
							/>
							<Form.Text className='text-muted'>
								Asegúrese de ingresar un correo valido ya que nos comunicaremos
								con usted por ese medio.
							</Form.Text>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>Edad de tu mascota *</Form.Label>
							<Form.Control
								name='petAge'
								{...formik.getFieldProps('petAge')}
								type='number'
								placeholder='5'
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
									<option value='car'>Gato</option>
									<option value='dog'>Perro</option>
									<option value='turtle'>Tortuga</option>
									<option value='rabbit'>Conejo</option>
									<option value='bird'>Ave</option>
									<option value='other'>Otro</option>
								</Form.Select>
							</Form.Group>
							<Form.Group as={Col} sm={12} md={6} className='mb-3'>
								<Form.Label>Raza de tu mascota</Form.Label>
								<Form.Control
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
								{vetPlans.map((plan) =>
									plan.name === selectedPlan.name ? (
										<option key={plan.title} selected={true} value={plan.name}>
											{plan.title}
										</option>
									) : (
										<option key={plan.title} value={plan.name}>
											{plan.title}
										</option>
									)
								)}
							</Form.Select>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>Escribe tu consulta *</Form.Label>
							<Form.Control
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
