import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from '../../hooks/useForm';
import './Style-Contact.css';
import { useRef } from 'react';

const initialForm = {
	name: '',
	phone: '',
	email: '',
	description: '',
};

const validationsForm = (form) => {
	let errors = {};

	let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
	let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
	let regexDescription = /^.{1,500}$/;

	if (!form.name.trim()) {
		errors.name = "* El campo 'Nombre y apellido' es requerido";
	} else if (!regexName.test(form.name.trim())) {
		errors.name = "* El campo 'Nombre y apellido' solo acepta letras";
	}

	if (!form.phone.trim()) {
		errors.phone = "* El campo 'Telefono' es requerido";
	}

	if (!form.email.trim()) {
		errors.email = "* El campo 'Correo electronico' es requerido";
	} else if (!regexEmail.test(form.email.trim())) {
		errors.email = "* El campo 'Correo electronico' es incorrecto";
	}

	if (!form.description.trim()) {
		errors.description = "* El campo 'Descripcion' es requerido";
	} else if (!regexDescription.test(form.description.trim())) {
		errors.description =
			"* El campo 'Descripcion' no debe exeder los 500 caracteres";
	}

	return errors;
};

export const ContactForm = () => {
	const formRef = useRef();

	const {
		form,
		errors,
		hasErrors,
		isFormComplete,
		handleBlur,
		handleSubmit,
		handleChange,
	} = useForm(initialForm, validationsForm, formRef);

	return (
		<>
			<div className='contact-form-container mt-5 p-2'>
				<h2>Obten tu consulta online</h2>
				<Form className='mb-5' onSubmit={handleSubmit} ref={formRef}>
					<div className='row'>
						<Form.Group className='mb-3 col-12 col-md-6' controlId='name'>
							<Form.Label>Nombre y Apellido</Form.Label>
							<Form.Control
								type='text'
								max='38'
								min='1'
								required
								placeholder='Jose Paz'
								name='name'
								onChange={handleChange}
								onBlur={handleBlur}
								value={form.name}
							/>

							{errors.name && (
								<p className='validation-errors'>{errors.name}</p>
							)}
						</Form.Group>
						<Form.Group className='mb-3 col-12 col-md-6' controlId='phone'>
							<Form.Label>Telefono</Form.Label>
							<Form.Control
								type='number'
								required
								placeholder='3811234567'
								name='phone'
								onChange={handleChange}
								onBlur={handleBlur}
								value={form.phone}
							/>

							{errors.phone && (
								<p className='validation-errors'>{errors.phone}</p>
							)}
						</Form.Group>
					</div>
					<Form.Group className='mb-3' controlId='email'>
						<Form.Label>Correo electronico</Form.Label>
						<Form.Control
							type='email'
							required
							placeholder='josepaz@gmail.com'
							name='email'
							onChange={handleChange}
							onBlur={handleBlur}
							value={form.email}
						/>

						{errors.email && (
							<p className='validation-errors'>{errors.email}</p>
						)}
					</Form.Group>
					<Form.Group className='mb-3' controlId='description'>
						<Form.Label>Descripcion de la consulta</Form.Label>
						<Form.Control
							className='text-area-edit'
							as='textarea'
							required
							max='500'
							placeholder='Redacta tu consulta con el nombre, especie de tu mascota y la edad.'
							rows={3}
							name='description'
							onChange={handleChange}
							onBlur={handleBlur}
							value={form.description}
							pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
						/>

						{errors.description && (
							<p className='validation-errors'>{errors.description}</p>
						)}
					</Form.Group>
					<Button
						variant='primary'
						type='submit'
						disabled={!isFormComplete || hasErrors}>
						Enviar consulta
					</Button>
				</Form>
			</div>
		</>
	);
};
