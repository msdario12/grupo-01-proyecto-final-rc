import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const ListItems = ({ children, title, detail = false }) => {
	const tooltip = <Tooltip id='tooltip'>{children}</Tooltip>;
	return (
		<li className='list-group-item'>
			<FontAwesomeIcon icon={faCheckCircle} size='lg' />

			{detail ? (
				<span>
					<span className={`ms-2 me-3 ${detail ? 'fw-bolder' : ''}`}>
						{title}
					</span>
					<p className={`text-muted`}>{children}</p>
				</span>
			) : (
				<OverlayTrigger overlay={tooltip}>
					<span className={`ms-2 me-3`}>{title}</span>
				</OverlayTrigger>
			)}
		</li>
	);
};
