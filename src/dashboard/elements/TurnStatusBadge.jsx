import { Badge } from 'react-bootstrap';
import { turnStatusMatrix } from '../../helpers/turn-status-code';

export const TurnStatusBadge = ({ status }) => {
	return (
		<Badge pill bg={turnStatusMatrix[status].variant} className=''>
			{turnStatusMatrix[status].title}
		</Badge>
	);
};
