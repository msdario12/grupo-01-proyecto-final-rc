import { Form } from 'react-bootstrap';

export const InputWithFeedback = ({
	formik,
	name,
	type,
	placeholder,
	props,
	noFeedback = false,
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
			{!noFeedback && (
				<Form.Control.Feedback type='invalid'>
					{formik.errors[name]}
				</Form.Control.Feedback>
			)}
		</>
	);
};
