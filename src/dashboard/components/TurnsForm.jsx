import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { PatientInputWithSuggestions } from './PatientInputWithSuggestions';
import { useState } from 'react';

export const TurnsForm = () => {
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState('init');
	const formik = useFormik({
		initialValues: {
			multiSearch: '',
		},
	});

	const handleClickSuggestion = (suggestion) => {
		setIsUserInfoLoaded(true);
	};

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Form.Group className='mb-3' controlId='multiSearch'>
				<Form.Label>
					Ingresa el nombre de la mascota, o del dueño o el correo electrónico
				</Form.Label>
				<PatientInputWithSuggestions
					formik={formik}
					setIsUserInfoLoaded={setIsUserInfoLoaded}
					handleClickSuggestion={handleClickSuggestion}
					name={'multiSearch'}
					fieldsToRender={[
						{ name: 'name', title: 'Mascota' },
						{ name: 'email', title: 'Email' },
						{ name: 'firstName', title: 'Nombre' },
					]}
					endPoint='/api/patients'
					queryName='searchParam'
					hasTextCapitalization={true}
					placeholder={'Introduzca el nombre, email o nombre de la mascota'}
				/>
			</Form.Group>
			{!isUserInfoLoaded ? <Button>Crear paciente</Button> : ''}
		</Form>
	);
};
