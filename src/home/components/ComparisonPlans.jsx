import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
// Este objeto sera reemplazado por la base de datos, luego se borra
import { vetPlans } from '../../../vetPlansDB';
import { Link } from 'react-router-dom';

const ListItems = ({ children, title }) => {
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

const ComparisonCardsPlans = ({
	children,
	title,
	description,
	price,
	name,
	button = 'secondary',
}) => {
	return (
		<Card>
			<Card.Body style={{ height: 500 }} className='d-flex flex-column '>
				<div
					style={{ height: 110 }}
					className='d-flex flex-column justify-content-between'>
					<Card.Title className='display-6 fw-bold'>{title}</Card.Title>
					<Card.Text>
						<p className='fs-6 lh-1'>{description}</p>
					</Card.Text>
				</div>
				<hr></hr>
				<h2 className='display-6 fw-bold position-relative mb-3'>
					{'$' + price}
					<span className='position-absolute  ms-2 fs-5 text-muted fw-normal'>
						/mes
					</span>
				</h2>
				<ul className='ms-0 ps-0 flex-grow-1'>{children}</ul>
				<div className='mx-auto'>
					<Link
						to={`/detail-plans/${name}`}
						className={'text-decoration-none text-white btn ' + button}>
						Adquirir Plan
					</Link>
				</div>
			</Card.Body>
		</Card>
	);
};

export const ComparisonPlans = () => {
	return (
		<section className='row mb-5'>
			<h2 className='text-center display-5 fw-bold mb-5'>
				Planes que ofrecemos
			</h2>
			{vetPlans.map((plan) => (
				<div key={plan.title} className='col-4'>
					<ComparisonCardsPlans
						name={plan.name}
						button={plan.button ? plan.button : 'btn-secondary'}
						title={plan.title}
						description={plan.description}
						price={plan.price}>
						{plan.items.map((item) => (
							<ListItems key={item.description} title={item.description}>
								{item.content}
							</ListItems>
						))}
						<ListItems title={'Vacunas y refuerzos'}>
							Cobertura completa de las vacunas necesarias para proteger a tu
							mascota en sus primeros años de vida.
						</ListItems>
					</ComparisonCardsPlans>
				</div>
			))}
		</section>
	);
};
