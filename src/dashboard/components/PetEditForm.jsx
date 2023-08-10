import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ToastContext } from '../../context/ToastContext';
import { petSchema } from '../schema-validations/petSchema';
import { PetInputsForm } from './PetInputsForm';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { CustomAlertResponse } from './CustomAlertResponse';
import { GenericEditPageContext } from '../pages/GenericEditPage';

const userEditSchema = Yup.object({ ...petSchema });

export const PetEditForm = () => {
	const [petData, setPetData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const { addToast } = useContext(ToastContext);
	const [inputsHasChanges, setInputsHasChanges] = useState(false);
	const { privateBackendAPI } = useAxiosPrivate();
	const [showAlert, setShowAlert] = useState(false);
	const [response, setResponse] = useState({ success: true });
	const { data } = useContext(GenericEditPageContext);

	const initialValues = {
		name: '',
		specie: 'placeholder',
		race: '',
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: userEditSchema,
		onSubmit: (values) => {
			// Logica para enviar informacion al backend
			const castValues = userEditSchema.cast(values);

			setIsLoading(true);
			privateBackendAPI
				.put(`/api/pets/${data.pet_id}`, castValues)
				.then((res) => {
					addToast({
						message: 'Mascota editada correctamente',
						variant: 'success',
					});
					setInputsHasChanges(false);
					setIsLoading(false);
				})
				.catch((e) => {
					console.error(e);
					setIsLoading(false);
					addToast({
						message:
							'Error al editar la mascota - ' + e?.response?.data?.message,
						variant: 'error',
					});
					setResponse(e?.response?.data);
					setShowAlert(true);
				});
		},
	});

	useEffect(() => {
		if (data) {
			privateBackendAPI.get(`/api/pets/${data.pet_id}`).then((res) => {
				setPetData(res.data.data);

				formik.setValues(res.data.data, true);
				formik.setTouched(res.data.data, true);
			});
		}
	}, [data, formik.handleSubmit]);

	useEffect(() => {
		if (formik.values === petData) {
			setInputsHasChanges(false);
		} else {
			setInputsHasChanges(true);
		}
	}, [petData, formik.values, formik.handleSubmit]);

	if (!petData) {
		return (
			<div className='d-flex justify-content-center gap-3 align-items-center'>
				<Spinner animation='border' size='md' />
				<span>Cargando mascota</span>
			</div>
		);
	}
	return (
		<div>
			<Form onSubmit={formik.handleSubmit}>
				<PetInputsForm formik={formik} />
				<CustomAlertResponse response={response} showAlert={showAlert} />

				<div className='d-flex justify-content-center gap-3'>
					<Button
						className='px-4 py-2'
						disabled={!formik.isValid || isLoading || !inputsHasChanges}
						variant={'secondary'}
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
							'Editar mascota'
						)}
					</Button>
				</div>
			</Form>
		</div>
	);
};
