import { Button, Form, Card } from 'react-bootstrap';

export const FormGroupDetailPlans = () => {
	return (
		<div>
			<Card>
				<Card.Body>
					<Card.Title className='display-6 fw-bold'>
						Envíenos su consulta
					</Card.Title>
					<Form>
						<Form.Group className='mb-3' controlId='userName'>
							<Form.Label>Nombre *</Form.Label>
							<Form.Control type='text' placeholder='Juan' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='lastName'>
							<Form.Label>Apellido *</Form.Label>
							<Form.Control type='text' placeholder='Perez' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='email'>
							<Form.Label>Correo Electrónico *</Form.Label>
							<Form.Control type='email' placeholder='juan@example.com' />
							<Form.Text className='text-muted'>
								Asegúrese de ingresar un correo valido ya que nos comunicaremos
								con usted por ese medio.
							</Form.Text>
						</Form.Group>

						<Form.Group className='mb-3' controlId='petAge'>
							<Form.Label>Edad de tu mascota *</Form.Label>
							<Form.Control type='number' placeholder='5' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='petSpecie'>
							<Form.Label>Especie de tu mascota</Form.Label>
							<Form.Select className='mb-3' controlId='planSelect'>
								<option>Selecciona uno</option>
								<option value='car'>Gato</option>
								<option value='dog'>Perro</option>
								<option value='turtle'>Tortuga</option>
								<option value='rabbit'>Conejo</option>
								<option value='bird'>Ave</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className='mb-3' controlId='petRace'>
							<Form.Label>Raza de tu mascota</Form.Label>
							<Form.Control type='text' placeholder='Chihuahua' />
						</Form.Group>
						<Form.Group>
							<Form.Label>
								Selecciona el plan sobre el que quieres consultar
							</Form.Label>
							<Form.Select className='mb-3' controlId='planSelect'>
								<option value='1'>One</option>
								<option value='2'>Two</option>
								<option value='3'>Three</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className='mb-3' controlId='petRace'>
							<Form.Label>Escribe tu consulta *</Form.Label>
							<Form.Control
								as='textarea'
								type='text'
								style={{ height: 80 }}
								placeholder='Quisiera adquirir el Plan Primeros Pasos...'
							/>
						</Form.Group>

						<Button variant='primary' type='submit'>
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};
