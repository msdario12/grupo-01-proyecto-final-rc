import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

export const useForm = (initialForm, validateForm, formRef) => {
	const [form, setForm] = useState(initialForm);

	const [errors, setErrors] = useState({});

	const [isFormComplete, setIsFormComplete] = useState(false);

	const [hasErrors, setHasErrors] = useState(true);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleBlur = (e) => {
		handleChange(e);
		setErrors(validateForm(form));
	};

	useEffect(() => {
		const isComplete = Object.values(form).every((value) => value !== '');
		setIsFormComplete(isComplete);
	}, [form]);

	useEffect(() => {
		const errorsExist = Object.keys(errors).length > 0;
		setHasErrors(errorsExist);
	}, [errors]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(validateForm(form));

		emailjs
			.sendForm(
				'service_pzdzjgj',
				'template_udc3eyn',
				formRef.current,
				'IA7y8FZdE1Zr4Ky_M'
			)
			.then(
				(result) => {
					if (Object.keys(errors).length === 0) {
						Swal.fire({
							title: 'Consulta enviada',
							text: 'Su consulta se envio con exito',
							icon: 'success',
							confirmButtonColor: '#0d6efd',
						});
					}
				},
				(error) => {
					Swal.fire({
						title: 'Error al enviar',
						text: 'Contacte al administrador',
						icon: 'error',
						confirmButtonColor: '#0d6efd',
					});
				}
			);

		setForm(initialForm);
	};

	return {
		form,
		errors,
		isFormComplete,
		hasErrors,
		handleChange,
		handleBlur,
		handleSubmit,
	};
};
