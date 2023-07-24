import { Form } from 'react-bootstrap';

export const InputWithFeedback = ({
	formik,
	name,
	type,
	placeholder,
	validFeedback = 'Ok',
    props
}) => {
	return (
		<>
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
		</>
	);
};
