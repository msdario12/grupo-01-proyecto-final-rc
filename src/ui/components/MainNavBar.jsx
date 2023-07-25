import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const MainNavBar = () => {
	const [isUserLogged, setIsUserLogged] = useState(false);
	return (
		<Navbar
			expand='lg'
			sticky='top'
			className='bg-body-tertiary'
			data-bs-theme='dark'>
			<Container>
				<Navbar.Brand href='#home'>
					<span className='text-info fw-bold'>RollingVet</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='#link'>Nuestros Planes</Nav.Link>
						<Nav.Link href='#link2'>Contáctenos</Nav.Link>
						<Nav.Link href='#link3'>Sobre Nosotros</Nav.Link>
					</Nav>
					<Navbar.Text>
						{isUserLogged ? (
							<>
								Signed in as: <a href='#login'>Mark Otto</a>
							</>
						) : (
							<Nav.Link href='#link3'>Acceder</Nav.Link>
						)}
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
