import * as Yup from 'yup';
import { UsersInputsForm } from './UsersInputsForm';
import { useFormik } from 'formik';
import { userSchema } from '../schema-validations/userSchema';
import { backendAPI } from '../../api/backendAPI';
import { useContext, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ToastContext } from '../../context/ToastContext';

const userEditSchema = Yup.object({ ...userSchema });

export const UserEditForm = ({ userID }) => {
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);
	const [dataToEdit, setDataToEdit] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [inputsHasChanges, setInputsHasChanges] = useState(false);
	const { addToast } = useContext(ToastContext);

	const initialValues = {
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: userEditSchema,
		onSubmit: (values) => {
			// Logica para enviar informacion al backend
			const castValues = userEditSchema.cast(values);
			console.log(castValues);
			setIsLoading(true);
			backendAPI
				.put(`/api/users/${userID}`, castValues)
				.then((res) => {
					addToast({
						message: 'Usuario editado correctamente',
						variant: 'success',
					});

					setIsLoading(false);
					setInputsHasChanges(false);
					console.log(res);
				})
				.catch((e) => {
					console.error(e);
					setIsLoading(false);
					addToast({
						message: 'Error al editar el usuario',
						variant: 'error',
					});
				});

			setIsUserInfoLoaded(false);
		},
	});

	useEffect(() => {
		backendAPI.get(`/api/users/${userID}`).then((res) => {
			console.log(res.data);
			setDataToEdit(res.data.data);
			formik.setValues(res.data.data, true);
			formik.setTouched(res.data.data, true);
		});
	}, [userID, formik.handleSubmit]);

	useEffect(() => {
		if (formik.values === dataToEdit) {
			console.log('son iguales');
			setInputsHasChanges(false);
		} else {
			setInputsHasChanges(true);
		}
	}, [dataToEdit, formik.values]);

	if (!dataToEdit) {
		return 'Cargando datos...';
	}
	return (
		<div>
			<Form onSubmit={formik.handleSubmit}>
				<UsersInputsForm
					formik={formik}
					setIsUserInfoLoaded={setIsUserInfoLoaded}
					isUserInfoLoaded={isUserInfoLoaded}
					inputsHasChanges={inputsHasChanges}
				/>

				<div className='d-flex justify-content-center gap-3'>
					<Button
						className='px-4 py-2'
						disabled={!formik.isValid || isLoading || !inputsHasChanges}
						variant={'primary'}
						size='md'
						type='submit'>
						{isLoading ? (
							<div>
								<Spinner
									as='span'
									animation='border'
									size='sm'
									role='status'
									aria-hidden='true'
								/>
								<span className='ms-2'>Cargando</span>
							</div>
						) : (
							'Editar usuario'
						)}
					</Button>
				</div>
			</Form>
		</div>
	);
};
