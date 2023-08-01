import * as Yup from 'yup';
import { UsersInputsForm } from './UsersInputsForm';
import { useFormik } from 'formik';
import { userSchema } from '../schema-validations/userSchema';
import { backendAPI } from '../../api/backendAPI';
import { useContext, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { CustomToast } from './CustomToast';
import { ToastContext } from '../../context/ToastContext';

const userEditSchema = Yup.object({ ...userSchema });

export const UserEditForm = ({ userID }) => {
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);
	const [dataToEdit, setDataToEdit] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const { setStatus: setToastStatus } = useContext(ToastContext);

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
					setToastStatus({
						show: true,
						message: 'Usuario editado correctamente',
						variant: 'success',
					});
					setIsLoading(false);
					console.log(res);
				})
				.catch((e) => {
					console.error(e);
					setIsLoading(false);
					setToastStatus({
						show: true,
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

	if (!dataToEdit) {
		return 'Cargando datos...';
	}
	return (
		<div>
			<CustomToast />
			<Form onSubmit={formik.handleSubmit}>
				<UsersInputsForm
					formik={formik}
					setIsUserInfoLoaded={setIsUserInfoLoaded}
					isUserInfoLoaded={isUserInfoLoaded}
				/>

				<div className='d-flex justify-content-center gap-3'>
					<Button
						className='px-4 py-2'
						disabled={!formik.isValid || isLoading}
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
