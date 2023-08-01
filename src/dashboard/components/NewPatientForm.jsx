import { Button, Card, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { animalsSpecies } from '../../plan-details/components/FormGroupDetailPlans';
import { useEffect, useState } from 'react';
import { backendAPI } from '../../api/backendAPI';
import * as Yup from 'yup';
import { UsersInputsForm } from './UsersInputsForm';
import { PetInputsForm } from './PetInputsForm';

const patientSchema = Yup.object({
	firstName: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[a-zA-Z0-9]*$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	lastName: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[a-zA-Z0-9]*$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	email: Yup.string()
		.email('Introduzca un email valido')
		.required('Campo obligatorio'),
	phone: Yup.string()
		.matches(
			// eslint-disable-next-line no-useless-escape
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
			'Introduce un número de teléfono válido'
		)
		.min(3, 'Mínimo de 3 caracteres')
		.max(15, 'Máximo de 15 caracteres')
		.required('Campo obligatorio'),
	name: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[a-zA-Z0-9]*$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	specie: Yup.string()
		.required('Campo obligatorio')
		.oneOf(
			animalsSpecies.map((animal) => animal.value),
			'Selecciona una especie de la lista'
		),
	race: Yup.string()
		.required('Campo obligatorio')
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[a-zA-Z0-9]*$/, 'Sólo letras del alfabeto'),
});

export const NewPatientForm = ({
	editMode = false,
	selectedPatientID = {},
}) => {
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);
	const [dataToEdit, setDataToEdit] = useState();

	const initialValues = {
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		name: '',
		specie: 'placeholder',
		race: '',
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: patientSchema,

		onSubmit: (values) => {
			// Logica para enviar informacion al backend
			const castValues = patientSchema.cast(values);

			if (editMode) {
				backendAPI
					.put(`/api/users/${dataToEdit.user_id}`, {
						_id: dataToEdit.user_id,
						email: castValues.email,
						firstName: castValues.firstName,
						lastName: castValues.lastName,
						phone: castValues.phone,
					})
					.then((res) => console.log(res));

				return;
			}

			backendAPI
				.post('/api/patients', castValues)
				.then((res) => console.log(res));

			formik.resetForm();
			setIsUserInfoLoaded(false);
		},
	});

	useEffect(() => {
		if (!editMode) {
			return;
		}
		backendAPI.get(`/api/patients/${selectedPatientID}`).then((res) => {
			console.log(res.data);
			setDataToEdit(res.data.data);
			formik.setValues(res.data.data, true);
		});
	}, [editMode, selectedPatientID]);

	if (editMode && !dataToEdit) {
		return 'Cargando datos...';
	}
	return (
		<Card className={editMode ? 'border-0' : ''}>
			<Card.Body>
				<Form onSubmit={formik.handleSubmit}>
					<UsersInputsForm
						formik={formik}
						setIsUserInfoLoaded={setIsUserInfoLoaded}
						isUserInfoLoaded={isUserInfoLoaded}
					/>

					<PetInputsForm formik={formik} />

					<div className='d-flex justify-content-center gap-3'>
						<Button
							className='px-4 py-2'
							disabled={!formik.isValid}
							variant={editMode ? 'outline-primary' : 'primary'}
							size='md'
							type='submit'>
							{editMode ? 'Editar' : 'Enviar'}
						</Button>
						<Button
							className='px-4 py-2'
							variant={editMode ? 'outline-danger' : 'danger'}
							size='md'
							onClick={() => {
								formik.resetForm();
								setIsUserInfoLoaded(false);
							}}
							type='button'>
							Limpiar
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
};
