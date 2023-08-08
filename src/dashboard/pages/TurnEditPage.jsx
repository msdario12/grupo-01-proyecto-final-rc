import * as Yup from 'yup';
import { UsersInputsForm } from '../components/UsersInputsForm';
import { useFormik } from 'formik';
import { userSchema } from '../schema-validations/userSchema';
import { useContext, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ToastContext } from '../../context/ToastContext';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { CustomAlertResponse } from '../components/CustomAlertResponse';
import { GenericEditPageContext } from './GenericEditPage';
import { TurnsInputForm } from '../components/TurnsInputForm';
import { turnEditSchema } from '../schema-validations/turnSchema';
import { parseISO } from 'date-fns';

const newTurnSchema = Yup.object({ ...turnEditSchema });

export const TurnEditPage = () => {
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);
	const [dataToEdit, setDataToEdit] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [inputsHasChanges, setInputsHasChanges] = useState(false);
	const { addToast } = useContext(ToastContext);
	const { privateBackendAPI } = useAxiosPrivate();
	const [showAlert, setShowAlert] = useState(false);
	const [response, setResponse] = useState({ success: true });
	const { data } = useContext(GenericEditPageContext);

	const formik = useFormik({
		initialValues: {
			vet: '',
			turnDate: '',
			details: '',
		},
		validationSchema: newTurnSchema,
		onSubmit: (values) => {
			// Logica para enviar informacion al backend
			const castValues = newTurnSchema.cast(values);
			castValues.patient_id = data.patient_id;
			castValues.date = castValues.turnDate.toISOString();
			console.log(castValues);
			setIsLoading(true);
			privateBackendAPI
				.put(`/api/turns/${data._id}`, castValues)
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
					if (e.response.data.errors) {
						const { errors } = e.response.data;
						const errorList = (
							<ul>
								{errors.map((e) => (
									<li key={e.value}>{e.msg}</li>
								))}
							</ul>
						);
						addToast({
							variant: 'error',
							message: errorList,
						});
						setResponse({
							success: false,
							message: errorList,
						});
						setShowAlert(true);
						setIsLoading(false);

						return;
					}
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
		setDataToEdit(data);
		if (data.date) {
			formik.setFieldValue('vet', data.vet);
			formik.setFieldValue('details', data.details);
			formik.setFieldValue('turnDate', new Date(data?.date));

			formik.setFieldTouched('vet', true, false);
			formik.setFieldTouched('details', true, false);
			formik.setFieldTouched('turnDate', true, false);
		}
	}, [data]);

	useEffect(() => {
		const { details, turnDate, vet } = formik.values;
		if (
			details === data.details &&
			turnDate.toISOString() === data.date &&
			vet === data.vet
		) {
			console.log('son iguales');
			setInputsHasChanges(false);
		} else {
			setInputsHasChanges(true);
		}
	}, [data, formik.values]);

	if (!dataToEdit) {
		return (
			<div className='d-flex justify-content-center gap-3 align-items-center'>
				<Spinner animation='border' size='md' />
				<span>Cargando Turno</span>
			</div>
		);
	}
	return (
		<div>
			<Form onSubmit={formik.handleSubmit} onFocus={() => setShowAlert(false)}>
				<TurnsInputForm
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
