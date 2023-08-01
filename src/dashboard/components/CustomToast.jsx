import {
	faCheck,
	faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { ToastContext } from '../../context/ToastContext';
import { ToastContainer } from 'react-bootstrap';

const variants = {
	success: {
		bg: 'bg-success',
		icon: faCheck,
		title: 'Operación exitosa',
	},
	error: {
		bg: 'bg-danger',
		icon: faTriangleExclamation,
		title: 'Error en la operación',
	},
};

export const InternalToast = ({ toast }) => {
	const [showToast, setShowToast] = useState(toast.status);
	return (
		<Toast
			style={{ zIndex: 10000 }}
			className={` ${variants[toast.variant].bg}`}
			onClose={() => setShowToast(false)}
			show={showToast}
			delay={8000}
			autohide={true}>
			<Toast.Header>
				<span className='me-2'>
					<FontAwesomeIcon icon={variants[toast.variant].icon} size='md' />
				</span>
				<strong className='me-auto'>{variants[toast.variant].title}</strong>
			</Toast.Header>
			<Toast.Body className='text-white'>{toast.message}</Toast.Body>
		</Toast>
	);
};

export const CustomToast = () => {
	const { toastList } = useContext(ToastContext);

	return (
		<ToastContainer className='position-fixed bottom-0 end-0 me-3 mb-3'>
			{toastList.map((toast) => (
				<InternalToast key={toast.date} toast={toast} />
			))}
		</ToastContainer>
	);
};
