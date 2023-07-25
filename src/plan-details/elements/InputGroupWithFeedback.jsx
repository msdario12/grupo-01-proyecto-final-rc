import { Form, InputGroup } from 'react-bootstrap';

export const InputGroupWithFeedback = ({
	formik,
	name,
	type,
	placeholder,
	validFeedback = 'Ok',
	text,
	props,
}) => {
	return (
		<>
			<InputGroup className='mb-3'>
				<Form.Control
					{...props}
					isValid={!formik.errors[name] && formik.touched[name]}
					isInvalid={formik.errors[name]}
					name={name}
					{...formik.getFieldProps(name)}
					type={type}
					placeholder={placeholder}
				/>
				<Form.Control.Feedback type='invalid'>
					{formik.errors[name]}
				</Form.Control.Feedback>
				<Form.Control.Feedback type='valid'>
					{validFeedback}
				</Form.Control.Feedback>
				<InputGroup.Text>{text}</InputGroup.Text>
			</InputGroup>
		</>
	);
};
