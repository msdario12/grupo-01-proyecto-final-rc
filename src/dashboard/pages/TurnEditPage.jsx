import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ToastContext } from '../../context/ToastContext';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { CustomAlertResponse } from '../components/CustomAlertResponse';
import { GenericEditPageContext } from './GenericEditPage';
import { TurnsInputForm } from '../components/TurnsInputForm';
import { turnEditSchema } from '../schema-validations/turnSchema';
import { statusList } from '../../helpers/turn-status-code';

const newTurnSchema = Yup.object({
	...turnEditSchema,
	status: Yup.string()
		.required('Campo obligatorio')
		.oneOf(
			statusList.map((vet) => vet.name),
			'Selecciona una estado de la lista'
		),
});

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
			status: '',
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
		if (data) {
			formik.setFieldValue('vet', data.vet);
			formik.setFieldValue('details', data.details);
			formik.setFieldValue('turnDate', new Date(data?.date));
			formik.setFieldValue('status', data.status);

			formik.setFieldTouched('vet', true, false);
			formik.setFieldTouched('details', true, false);
			formik.setFieldTouched('turnDate', true, false);
			formik.setFieldTouched('status', true, false);
		}
	}, [data]);

	useEffect(() => {
		const { details, turnDate, vet, status } = formik.values;
		if (
			details === data?.details &&
			turnDate.toISOString() === data?.date &&
			vet === data?.vet &&
			status === data?.status
		) {
			console.log('son iguales');
			setInputsHasChanges(false);
		} else {
			setInputsHasChanges(true);
		}
	}, [data, formik.values]);

	if (!data || !dataToEdit) {
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
				<Form.Group className='mb-3' controlId='status'>
					<Form.Label>Estado del turno *</Form.Label>
					<Form.Select
						className='text-capitalize'
						name='status'
						{...formik.getFieldProps('status')}
						isValid={!formik.errors.status && formik.touched.status}
						isInvalid={formik.errors.status && formik.touched.status}>
						<option disabled value={'placeholder'}>
							Selecciona un estado
						</option>
						{statusList.map((status) => (
							<option key={status.name} value={status.name}>
								{status.title}
							</option>
						))}
					</Form.Select>
					<Form.Control.Feedback type='invalid'>
						{formik.errors.status}
					</Form.Control.Feedback>
				</Form.Group>
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
