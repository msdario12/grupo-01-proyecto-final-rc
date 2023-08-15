import {
	faAngleLeft,
	faAngleRight,
	faSignIn,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { WeatherData } from './WeatherData';
import { AuthContext } from '../../context/AuthProvider';

export const MainNavBar = ({
	isInDashboard,
	setIsSideBarOpen,
	isSideBarOpen,
}) => {
	const { auth, setAuth } = useContext(AuthContext);
	const [isUserLogged, setIsUserLogged] = useState(true);
	const [isNavTooggle, setIsNavTooggle] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogoutClick = () => {
		setAuth({});
		localStorage.removeItem('token');
		navigate('/');
	};

	useEffect(() => {
		if (auth.accessToken) {
			setIsUserLogged(true);
		} else {
			setIsUserLogged(false);
		}
	}, [auth]);

	return (
		<Navbar
			onToggle={() => setIsNavTooggle((prev) => !prev)}
			collapseOnSelect={true}
			expand='lg'
			sticky={'top'}
			className='bg-dark'
			data-bs-theme='dark'>
			<Container fluid={'lg'}>
				{isInDashboard ? (
					<Navbar.Brand>
						<Button
							variant='outline-light d-lg-none'
							onClick={() => setIsSideBarOpen((prev) => !prev)}>
							{isSideBarOpen ? (
								<FontAwesomeIcon icon={faAngleLeft} />
							) : (
								<FontAwesomeIcon icon={faAngleRight} />
							)}
						</Button>
					</Navbar.Brand>
				) : (
					<Navbar.Brand as={NavLink} to={'/'}>
						<span className='text-info fw-bold d-none d-sm-block'>
							RollingVet
						</span>
						<span className='text-info fw-bold d-sm-none'>RV</span>
					</Navbar.Brand>
				)}

				<Navbar.Text className='mx-3'>
					<WeatherData />
				</Navbar.Text>

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						{/* falta agregar que se compruebe que el usuario esta logueado */}
						{isInDashboard ? (
							<Nav.Link as={NavLink} to={'/'} state={{ prevUrl: location }}>
								Home
							</Nav.Link>
						) : (
							isUserLogged && (
								<Nav.Link
									as={NavLink}
									to={'/dashboard'}
									state={{ prevUrl: location }}>
									Panel administrador
								</Nav.Link>
							)
						)}
						<Nav.Link
							as={NavLink}
							to={'/detail-plans/medium'}
							state={{ prevUrl: location }}>
							Planes
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to={'/contact'}
							state={{ prevUrl: location }}>
							Contáctenos
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to={'/our-developers'}
							state={{ prevUrl: location }}>
							Sobre Nosotros
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to={'/about-us'}
							state={{ prevUrl: location }}>
							Nuestra Empresa
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<div
					className={`d-flex justify-content-between ${
						isNavTooggle ? 'w-100' : ''
					}`}>
					<Navbar.Text className='mx-3'>
						{isUserLogged ? (
							<div className='d-flex flex-lg-column align-items-center gap-1'>
								<span>Usuario: </span>
								<NavDropdown
									drop='down'
									align={'end'}
									title={
										auth.firstName
											? auth.firstName.at(0).toUpperCase() +
											  auth.firstName.slice(1)
											: ''
									}
									menuVariant='dark'>
									<NavDropdown.Item href='#action/3.1'>
										Mi cuenta
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item as={Button} onClick={handleLogoutClick}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</div>
						) : (
							<Nav.Link
								as={NavLink}
								to={'/login'}
								state={{ prevUrl: location }}>
								{
									<div className='d-flex gap-3 align-items-center'>
										<FontAwesomeIcon icon={faSignIn} />
										<span>Acceso de admin</span>
									</div>
								}
							</Nav.Link>
						)}
					</Navbar.Text>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
				</div>
			</Container>
		</Navbar>
	);
};
