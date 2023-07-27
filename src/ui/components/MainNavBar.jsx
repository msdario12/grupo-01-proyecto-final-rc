import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { WeatherData } from './WeatherData';

export const MainNavBar = ({
	isInDashboard,
	setIsSideBarOpen,
	isSideBarOpen,
}) => {
	const [isUserLogged, setIsUserLogged] = useState(true);

	return (
		<Navbar
			expand='lg'
			sticky={isInDashboard ? false : 'top'}
			className='bg-dark'
			data-bs-theme='dark'>
			<Container fluid={isInDashboard ? 'fluid' : 'lg'}>
				{isInDashboard ? (
					<Navbar.Brand>
						<Button
							variant='outline-light'
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

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						{/* falta agregar que se compruebe que el usuario esta logueado */}
						{isInDashboard ? (
							<Nav.Link as={NavLink} to={'/'}>
								Home
							</Nav.Link>
						) : (
							isUserLogged && (
								<Nav.Link as={NavLink} to={'/dashboard'}>
									Panel administrador
								</Nav.Link>
							)
						)}
						<Nav.Link href='#linkd'>Planes</Nav.Link>
						<Nav.Link href='#link44'>Productos</Nav.Link>
						<Nav.Link href='#link2'>Contáctenos</Nav.Link>
						<Nav.Link href='#link3'>Sobre Nosotros</Nav.Link>
					</Nav>
					<Navbar.Text className='me-3'>
						<WeatherData />
					</Navbar.Text>
					<Nav>
						<Navbar.Text>
							{isUserLogged ? (
								<div className='d-flex flex-lg-column align-items-center gap-1'>
									<span>Signed in as:</span>
									<NavDropdown
										drop='down'
										align={'end'}
										title='Mark Otto'
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
								<Nav.Link href='#link445'>Acceder</Nav.Link>
							)}
						</Navbar.Text>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
