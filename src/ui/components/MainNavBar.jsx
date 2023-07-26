import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

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
							<Nav.Link as={NavLink} to={'/dashboard'}>
								Panel administrador
							</Nav.Link>
						)}
						<Nav.Link href='#linkd'>Planes</Nav.Link>
						<Nav.Link href='#link44'>Productos</Nav.Link>
						<Nav.Link href='#link2'>Contáctenos</Nav.Link>
						<Nav.Link href='#link3'>Sobre Nosotros</Nav.Link>
					</Nav>
					<Nav>
						<Navbar.Text>
							{isUserLogged ? (
								<>
									Signed in as: <a href='#login'>Mark Otto</a>
								</>
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
