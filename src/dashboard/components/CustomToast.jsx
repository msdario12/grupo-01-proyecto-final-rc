import {
	faCheck,
	faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

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

export const CustomToast = ({ variant = 'success', message = '' }) => {
	const [show, setShow] = useState(false);
	return (
		<Row>
			<Col xs={6}>
				<Toast
					className={`position-fixed bottom-0 end-0 me-3 mb-3 ${variants[variant].bg}`}
					onClose={() => setShow(false)}
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
			<Col xs={6}>
				<Button onClick={() => setShow(true)}>Show Toast</Button>
			</Col>
		</Row>
	);
};
