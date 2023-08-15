import { Form, FormControl } from 'react-bootstrap';
import {
	filterPassedTime,
	isWeekday,
	vetList,
} from '../../schema-validations/turnSchema';
import ReactDatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import { InputWithFeedback } from '../../../plan-details/elements/InputWithFeedback';

export const TurnsInputForm = ({ formik }) => {
	return (
		<div>
			<Form.Group className='mb-3' controlId='vet'>
				<Form.Label>Veterinario para el turno *</Form.Label>
				<Form.Select
					className='text-capitalize'
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
				<Form.Label>Selecciona la fecha y hora para el turno *</Form.Label>
				<FormControl
					as={ReactDatePicker}
					name='turnDate'
					isClearable
					showIcon
					autoComplete='off'
					minDate={new Date()}
					selected={formik.values.turnDate}
					onChange={(value) => formik.setFieldValue('turnDate', value)}
					onSelect={(value) => formik.setFieldValue('turnDate', value)}
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
		</div>
	);
};
