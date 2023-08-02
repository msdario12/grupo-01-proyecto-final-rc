import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { backendAPI } from '../../api/backendAPI';
import * as Yup from 'yup';
import { UsersInputsForm } from './UsersInputsForm';
import { PetInputsForm } from './PetInputsForm';
import { userSchema } from '../schema-validations/userSchema';
import { petSchema } from '../schema-validations/petSchema';
import { ToastContext } from '../../context/ToastContext';
import { HeaderTitleDashboard } from '../elements/HeaderTitleDashboard';

const patientSchema = Yup.object({
	...userSchema,
	...petSchema,
});

export const NewPatientForm = ({
	modalMode = false,
	editMode = false,
	selectedPatientID = {},
}) => {
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);
	const [dataToEdit, setDataToEdit] = useState();
	const { addToast } = useContext(ToastContext);

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
					.then((res) => {
						addToast({
							variant: 'success',
							message: 'Paciente creado correctamente',
						});
						console.log(res);
					})
					.catch((e) =>
						addToast({
							variant: 'error',
							message: 'Error al crear el paciente',
						})
					);

				return;
			}

			backendAPI
				.post('/api/patients', castValues)
				.then((res) => {
					addToast({
						variant: 'success',
						message: 'Paciente creado correctamente',
					});
					console.log(res);
				})
				.catch((e) =>
					addToast({
						variant: 'error',
						message: 'Error al crear el paciente',
					})
				);

			formik.resetForm();
			setIsUserInfoLoaded(false);
		},
	});

	useEffect(() => {
		if (!editMode) {
			return;
		}
		backendAPI.get(`/api/patients/${selectedPatientID}`).then((res) => {
			setDataToEdit(res.data.data);
			formik.setValues(res.data.data, true);
		});
	}, [editMode, selectedPatientID]);

	if (editMode && !dataToEdit) {
		return 'Cargando datos... s';
	}
	return (
		<div>
			{!modalMode ? (
				<HeaderTitleDashboard
					title={'Añadir paciente'}
					subtitle={'Busca un email existente o crea uno.'}
				/>
			) : (
				''
			)}

			<Card className={editMode || modalMode ? 'border-0' : ''}>
				<Card.Body>
					<Form onSubmit={formik.handleSubmit}>
						<Row className='mb-lg-3 mb-1'>
							<Col sm={12} lg={6}>
								<h3 className='mb-lg-3 mb-1'>Datos del dueño</h3>
								<UsersInputsForm
									formik={formik}
									setIsUserInfoLoaded={setIsUserInfoLoaded}
									isUserInfoLoaded={isUserInfoLoaded}
								/>
							</Col>
							<Col sm={12} lg={6}>
								<h3 className='mb-lg-3 mb-1'>Datos de la mascota</h3>
								<PetInputsForm formik={formik} />
							</Col>
						</Row>
						<div className='d-flex justify-content-center gap-3'>
							<Button
								className='px-4 py-2'
								disabled={!formik.isValid}
								variant={editMode ? 'outline-primary' : 'primary'}
								size='md'
								type='submit'>
								{editMode ? 'Editar paciente' : 'Crear paciente'}
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
		</div>
	);
};