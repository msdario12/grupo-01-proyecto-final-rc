import { Alert } from 'react-bootstrap';

export const CustomAlertResponse = ({ showAlert, response }) => {
	if (showAlert) {
		return (
			<div>
				{!response?.success ? (
					<Alert transition={true} variant='danger'>
						{response?.message}
					</Alert>
				) : (
					<Alert transition={true} variant='success'>
						{response?.message}
					</Alert>
				)}
			</div>
		);
	}
	return <br />;
};
