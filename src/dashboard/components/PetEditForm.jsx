import * as Yup from 'yup';
import { useFormik } from 'formik';
import { backendAPI } from '../../api/backendAPI';
import { useContext, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ToastContext } from '../../context/ToastContext';
import { petSchema } from '../schema-validations/petSchema';
import { PetInputsForm } from './PetInputsForm';

const userEditSchema = Yup.object({ ...petSchema });

export const PetEditForm = ({ petID }) => {
	const [petData, setPetData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const { addToast } = useContext(ToastContext);

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
			console.log(castValues);
			setIsLoading(true);
			backendAPI
				.put(`/api/pets/${petID}`, castValues)
				.then((res) => {
					addToast({
						message: 'Mascota editada correctamente',
						variant: 'success',
					});

					setIsLoading(false);
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
		},
	});

	useEffect(() => {
		console.log(petID);
		if (petID) {
			backendAPI.get(`/api/pets/${petID}`).then((res) => {
				setPetData(res.data.data);
				console.log(res.data.data);
				formik.setValues(res.data.data, true);
				formik.setTouched(res.data.data, true);
			});
		}
	}, [petID, formik.handleSubmit]);
	console.log(petData);
	if (!petData) {
		return 'Cargando datos...';
	}
	return (
		<div>
			<Form onSubmit={formik.handleSubmit}>
				<PetInputsForm formik={formik} />

				<div className='d-flex justify-content-center gap-3'>
					<Button
						className='px-4 py-2'
						disabled={!formik.isValid || isLoading}
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
