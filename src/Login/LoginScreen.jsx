import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { HeaderTitleDashboard } from '../dashboard/elements/HeaderTitleDashboard';
import { backendAPI } from '../api/backendAPI';
export const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState(true);
	const [passwordError, setPasswordError] = useState(true);
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState({ success: true });
	const [showAlert, setShowAlert] = useState(false);
	const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const passwordRegex =
		/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
	const navigate = useNavigate();

	const isValidEmail = emailRegex.test(email);
	const isValidPassword = passwordRegex.test(password);

	const handleChange = (e) => {
		setEmailError(false);
		setPasswordError(false);
		setShowAlert(false);
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		//validaciones
		if (password === '') {
			const msg = 'Introduce una contraseña';
			setPasswordError(msg);
		} else if (email === '') {
			const msg = 'Introduce un email';
			// alert('Todos los campos son obligatorios');
			setEmailError(msg);
		} else if (!isValidEmail) {
			setEmailError('No es un email valido');
		} else {
			setShowAlert(true);
			setPasswordError(false);
			setEmailError(false);
			setEmailTouched(false);
			setPasswordTouched(false);
			const { value: email } = e.target.email;
			const { value: password } = e.target.password;

			console.log(email, password);
			setIsLoading(true);
			backendAPI.post('/api/auth/login', { email, password }).then((res) => {
				console.log(res);
				setResponse(res.data);
				setIsLoading(false);
				if (res.data.success) {
					// autenticacion correcta
					setTimeout(() => navigate('/dashboard'), 2500);
				}
			});
		}
	};

	return (
		<div>
			<HeaderTitleDashboard
				title={'Login de administrador'}
				subtitle={'Ingresa con tus credenciales'}
			/>
			<Form onSubmit={handleLogin} className='mt-5'>
				<Form.Group controlId='email' className='mb-3'>
					<Form.Label>Email *</Form.Label>
					<Form.Control
						name='email'
						type='text'
						isInvalid={emailError && emailTouched}
						isValid={!emailError && emailTouched && isLoading}
						placeholder='example@gmail.com'
						onChange={(e) => {
							setEmail(e.target.value);
							setEmailTouched(false);
							handleChange();
						}}
						onBlur={() => setEmailTouched(true)}
						value={email}
					/>
					<Form.Control.Feedback type='invalid'>
						{emailError}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId='password' className='mb-3'>
					<Form.Label>Contraseña *</Form.Label>
					<Form.Control
						name='password'
						type='password'
						placeholder='contraseña'
						isInvalid={passwordError && passwordTouched}
						isValid={!passwordError && passwordTouched && isLoading}
						onBlur={() => setPasswordTouched(true)}
						onChange={(e) => {
							setPassword(e.target.value);
							setPasswordTouched(false);
							handleChange();
						}}
						value={password}
					/>
					<Form.Control.Feedback type='invalid'>
						{passwordError}
					</Form.Control.Feedback>
				</Form.Group>
				{showAlert && (
					<div>
						{!response.success ? (
							<Alert transition={true} variant='danger'>
								{response.message}
							</Alert>
						) : (
							<Alert transition={true} variant='success'>
								{response.message}
							</Alert>
						)}
					</div>
				)}
				<div className='d-flex justify-content-center'>
					<Button
						type='submit'
						className='px-4 py-2'
						disabled={emailError || passwordError}>
						Ingresar
					</Button>
				</div>
			</Form>
		</div>
	);
};
