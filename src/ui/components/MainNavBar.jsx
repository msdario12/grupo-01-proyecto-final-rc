import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

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
			<Container fluid='lg'>
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
					<Navbar.Brand href='#home'>
						<span className='text-info fw-bold d-none d-sm-block'>
							RollingVet
						</span>
						<span className='text-info fw-bold d-sm-none'>RV</span>
					</Navbar.Brand>
				)}

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='#link'>Planes</Nav.Link>
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
