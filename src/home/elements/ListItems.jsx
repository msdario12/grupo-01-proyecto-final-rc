import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const ListItems = ({ children, title }) => {
	const tooltip = <Tooltip id='tooltip'>{children}</Tooltip>;
	return (
		<li className='list-group-item mb-2'>
			<FontAwesomeIcon icon={faCheckCircle} size='lg' />

			<OverlayTrigger overlay={tooltip}>
				<span className='ms-2 me-3'>{title}</span>
			</OverlayTrigger>
		</li>
	);
};
