import { Button } from 'react-bootstrap';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export const UnauthorizedPage401 = ({ title }) => {
	const location = useLocation();
	useDocumentTitle(title);
	return (
		<main className='d-flex gap-3 flex-column align-items-center justify-content-center'>
			<span
				className='display-1 fw-semibold'
				style={{ fontSize: 'max(8vw,3rem)' }}>
				401
			</span>
			<span className='display-1'>Sin Autorización</span>

			<div className='d-flex flex-column gap-2'>
				<span className='fs-4'>
					Debe autenticarse para poder visitar esta página
				</span>
				<div className='mx-auto'>
					<Button
						variant='primary'
						as={Link}
						to={'/login'}
						state={{ prevUrl: location }}
						className='px-4 py-2'>
						Ir al Login
					</Button>
				</div>
			</div>
		</main>
	);
};
