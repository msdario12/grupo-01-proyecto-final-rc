import { Col, Form, Row } from 'react-bootstrap';
import { InputWithFeedback } from '../../plan-details/elements/InputWithFeedback';
import { animalsSpecies } from '../../plan-details/components/FormGroupDetailPlans';

export const PetInputsForm = ({ formik }) => {
	return (
		<>
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
				<Form.Group as={Col} sm={12} md={6} className='mb-3' controlId='specie'>
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
				<Form.Group as={Col} sm={12} md={6} className='mb-3' controlId='race'>
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
		</>
	);
};
