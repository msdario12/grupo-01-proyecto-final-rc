import { Form, InputGroup } from 'react-bootstrap';
import { InputWithFeedback } from '../../plan-details/elements/InputWithFeedback';
import { useFormik } from 'formik';
import { backendAPI } from '../../api/backendAPI';

export const TurnsForm = () => {
	const formik = useFormik({
		initialValues: {
			multiSearch: '',
		},
	});

	const handleChangeMultiSearch = (e) => {
		const { value } = e.target;
		if (value.length > 3) {
			console.log(value);
			backendAPI
				.get(`/api/patients?searchParam=${value}`)
				.then((res) => console.log(res.data));
		}
	};

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Form.Group className='mb-3' controlId='multiSearch'>
				<Form.Label>
					Ingresa el nombre de la mascota, o del dueño o el correo electrónico
				</Form.Label>
				<InputGroup onChange={handleChangeMultiSearch}>
					<InputWithFeedback
						type='text'
						placeholder='Mascota, nombre o email'
						formik={formik}
						name={'multiSearch'}
						props={{ maxLength: 40 }}
					/>
				</InputGroup>
			</Form.Group>
		</Form>
	);
};
