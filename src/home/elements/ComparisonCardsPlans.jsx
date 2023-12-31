import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ComparisonCardsPlans = ({
	children,
	title,
	description,
	price,
	name,
	detail = false,
	button = 'secondary',
}) => {
	return (
		<Card className={detail ? 'h-100' : ''}>
			<Card.Body
				style={{ height: detail ? 'auto' : 500 }}
				className='d-flex flex-column align-items-center align-md-items-start'>
				<div
					style={{ height: 110 }}
					className='d-flex flex-column justify-content-between'>
					<Card.Title className='display-6 fw-bold'>{title}</Card.Title>
					<Card.Text>
						<span className='fs-6 lh-1'>{description}</span>
					</Card.Text>
				</div>
				<hr></hr>
				<h2 className='display-6 fw-bold position-relative mb-3'>
					{'$' + price}
					<span className='position-absolute  ms-2 fs-5 text-muted fw-normal'>
						/mes
					</span>
				</h2>
				<ul className='ms-0 ps-0 flex-grow-1 d-flex flex-column justify-content-between'>
					{children}
				</ul>
				{!detail && (
					<div className='mx-auto'>
						<Link
							to={`/detail-plans/${name}`}
							className={'text-decoration-none text-white btn ' + button}>
							Adquirir Plan
						</Link>
					</div>
				)}
			</Card.Body>
		</Card>
	);
};
