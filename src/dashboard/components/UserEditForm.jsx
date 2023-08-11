import * as Yup from 'yup';
import { UsersInputsForm } from './UsersInputsForm';
import { useFormik } from 'formik';
import { userSchema } from '../schema-validations/userSchema';
import { useContext, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ToastContext } from '../../context/ToastContext';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { CustomAlertResponse } from './CustomAlertResponse';
import { GenericEditPageContext } from '../../context/GenericEditPageContext';

const userEditSchema = Yup.object({ ...userSchema });

export const UserEditForm = () => {
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);
	const [dataToEdit, setDataToEdit] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [inputsHasChanges, setInputsHasChanges] = useState(false);
	const { addToast } = useContext(ToastContext);
	const { privateBackendAPI } = useAxiosPrivate();
	const [showAlert, setShowAlert] = useState(false);
	const [response, setResponse] = useState({ success: true });
	const { data } = useContext(GenericEditPageContext);

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
			setIsLoading(true);
			privateBackendAPI
				.put(`/api/users/${data.user_id}`, castValues)
				.then(() => {
					addToast({
						message: 'Usuario editado correctamente',
						variant: 'success',
					});

					setIsLoading(false);
					setInputsHasChanges(false);
				})
				.catch((e) => {
					// eslint-disable-next-line no-console
					console.error(e);
					setIsLoading(false);
					addToast({
						message:
							'Error al editar el usuario - ' + e?.response?.data?.message,
						variant: 'error',
					});
					setResponse(e?.response?.data);
					setShowAlert(true);
				});

			setIsUserInfoLoaded(false);
		},
	});

	useEffect(() => {
		if (data) {
			privateBackendAPI.get(`/api/users/${data.user_id}`).then((res) => {
				setDataToEdit(res.data.data);
				formik.setValues(res.data.data, false);
				formik.setTouched(res.data.data, false);
			});
		}
	}, [data]);

	useEffect(() => {
		if (formik.values === dataToEdit) {
			setInputsHasChanges(false);
		} else {
			setInputsHasChanges(true);
		}
	}, [dataToEdit, formik.values]);

	if (!dataToEdit) {
		return (
			<div className='d-flex justify-content-center gap-3 align-items-center'>
				<Spinner animation='border' size='md' />
				<span>Cargando Usuario</span>
			</div>
		);
	}
	return (
		<div>
			<Form onSubmit={formik.handleSubmit} onFocus={() => setShowAlert(false)}>
				<UsersInputsForm
					editMode={true}
					formik={formik}
					setIsUserInfoLoaded={setIsUserInfoLoaded}
					isUserInfoLoaded={isUserInfoLoaded}
					inputsHasChanges={inputsHasChanges}
				/>
				<CustomAlertResponse response={response} showAlert={showAlert} />

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
