import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { WeatherData } from './WeatherData';
import { AuthContext } from '../../context/AuthProvider';

export const MainNavBar = ({
	isInDashboard,
	setIsSideBarOpen,
	isSideBarOpen,
}) => {
	const { auth } = useContext(AuthContext);
	const [isUserLogged, setIsUserLogged] = useState(true);
	const location = useLocation();

	useEffect(() => {
		console.log(auth)
		if (auth.accessToken) {
			setIsUserLogged(true);
		} else {
			setIsUserLogged(false);
		}
	}, [auth]);

	return (
		<Navbar expand='lg' sticky={'top'} className='bg-dark' data-bs-theme='dark'>
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
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
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

						<Nav.Link href='#linkd' state={{ prevUrl: location }}>
							Planes
						</Nav.Link>
						<Nav.Link href='#link44' state={{ prevUrl: location }}>
							Productos
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
					<Nav>
						<Navbar.Text>
							{isUserLogged ? (
								<div className='d-flex flex-lg-column align-items-center gap-1'>
									<span>Usuario: </span>
									<NavDropdown
										drop='down'
										align={'end'}
										title={auth.firstName}
										menuVariant='dark'>
										<NavDropdown.Item href='#action/3.1'>
											Mi cuenta
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href='#action/3.4'>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</div>
							) : (
								<Nav.Link
									as={NavLink}
									to={'/login'}
									state={{ prevUrl: location }}>
									Acceder
								</Nav.Link>
							)}
						</Navbar.Text>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
