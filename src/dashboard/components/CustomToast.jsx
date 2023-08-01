import {
	faCheck,
	faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { ToastContext } from '../../context/ToastContext';

const variants = {
	success: {
		bg: 'bg-success',
		icon: faCheck,
	},
	error: {
		bg: 'bg-danger',
		icon: faTriangleExclamation,
	},
};

export const CustomToast = () => {
	const { status, setStatus } = useContext(ToastContext);

	const { message = '', show, variant = 'success' } = status;

	return (
		<Row>
			<Col xs={6}>
				<Toast
					className={`position-fixed bottom-0 end-0 me-3 mb-3 ${variants[variant].bg}`}
					onClose={() => setStatus({ show: false })}
					show={show}
					delay={5000}
					autohide>
					<Toast.Header>
						<span className='me-2'>
							<FontAwesomeIcon icon={variants[variant].icon} size='md' />
						</span>
						<strong className='me-auto'>Operación Exitosa</strong>
					</Toast.Header>
					<Toast.Body className='text-white'>{message}</Toast.Body>
				</Toast>
			</Col>
		</Row>
	);
};
