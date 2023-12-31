import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import { useContext, useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { backendAPI } from '../api/backendAPI';
import { AuthContext } from '../context/AuthProvider';
import { CustomAlertResponse } from '../dashboard/ui/components/CustomAlertResponse';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
export const LoginScreen = ({ title }) => {
	useDocumentTitle(title);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState(true);
	const [passwordError, setPasswordError] = useState(true);
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState({ success: true });
	const [showAlert, setShowAlert] = useState(false);
	const navigate = useNavigate();
	const { setAuth } = useContext(AuthContext);
	const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	const handleChange = (e) => {
		if (e.target.name === 'email') {
			const { value: inputEmail } = e.target;
			if (inputEmail.length === 0) {
				const msg = 'Introduce un email';
				// alert('Todos los campos son obligatorios');
				setEmailError(msg);
			} else {
				setEmailError();
			}
		}
		if (e.target.name === 'password') {
			const { value: inputPassword } = e.target;
			if (inputPassword.length === 0) {
				const msg = 'Introduce una contraseña';
				setPasswordError(msg);
			} else {
				setPasswordError();
			}
		}
		setShowAlert(false);
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		//validaciones
		if (password.length === 0) {
			setPasswordTouched(true);
			const msg = 'Introduce una contraseña';
			setPasswordError(msg);
			return;
		}
		if (email.length === 0) {
			setEmailTouched(true);
			const msg = 'Introduce un email';
			// alert('Todos los campos son obligatorios');
			setEmailError(msg);
		}
		const isValidEmail = emailRegex.test(email);

		if (!isValidEmail) {
			setEmailError('No es un email valido');
		}

		// setPasswordError(false);
		// setEmailError(false);
		setEmailTouched(false);
		setPasswordTouched(false);

		setIsLoading(true);

		backendAPI
			.post(
				'/api/auth/login',
				{ email, password },
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			)
			.then((res) => {
				setPassword('');

				setShowAlert(true);
				setResponse(res.data);
				setIsLoading(false);
				if (!res.data.accessToken) {
					setResponse(res.data);
					return;
				}
				const accessToken = res?.data?.accessToken;
				const firstName = res?.data?.firstName;
				setAuth({ email, firstName, accessToken });
				// autenticación correcta
				localStorage.setItem('token', accessToken);
				setTimeout(() => navigate('/dashboard'), 2500);
			})
			.catch((e) => {
				setShowAlert(true);
				if (!e) {
					setResponse({
						success: false,
						message: 'Sin respuesta del servidor',
					});
				} else {
					setResponse({
						success: false,
						message: 'Error en la autenticación',
					});
				}
			});
	};

	return (
		<div className=''>
			<div style={{ width: 450 }} className='mx-auto'>
				<Form onSubmit={handleLogin} className='my-5'>
					<Card>
						<Card.Body>
							<div className=' mb-5'>
								<h2
									style={{ letterSpacing: 0.1 }}
									className='display-6 fw-bold'>
									Inicio de sesión
								</h2>
								<h4 className='display-6 fs-5'>Accede con tus credenciales</h4>
							</div>
							<Form.Group controlId='email' className='mb-3'>
								<Form.Label>Email *</Form.Label>
								<Form.Control
									name='email'
									type='text'
									isInvalid={emailError && emailTouched}
									isValid={!emailError && emailTouched}
									placeholder='example@gmail.com'
									onChange={(e) => {
										setEmail(e.target.value);
										handleChange(e);
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
									isValid={!passwordError && passwordTouched}
									onBlur={() => setPasswordTouched(true)}
									onChange={(e) => {
										setPassword(e.target.value);
										handleChange(e);
									}}
									value={password}
								/>
								<Form.Control.Feedback type='invalid'>
									{passwordError}
								</Form.Control.Feedback>
							</Form.Group>

							<CustomAlertResponse response={response} showAlert={showAlert} />

							<Button
								className='px-4 py-2 w-100'
								disabled={emailError || passwordError || isLoading || showAlert}
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
									'Ingresar'
								)}
							</Button>
						</Card.Body>
					</Card>
				</Form>
			</div>
		</div>
	);
};
