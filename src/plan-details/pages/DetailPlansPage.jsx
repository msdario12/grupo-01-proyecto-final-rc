import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { vetPlans } from '../../../vetPlansDB';
import { ComparisonCardsPlans } from '../../home/elements/ComparisonCardsPlans';
import { ListItems } from '../../home/elements/ListItems';
import { Card } from 'react-bootstrap';
import { FormGroupDetailPlans } from '../components/FormGroupDetailPlans';

export const DetailPlansPage = () => {
	const params = useParams();
	const [selectedPlan, setSetselectedPlan] = useState({});
	useEffect(() => {
		const foundedPlan = vetPlans.find((plan) => plan.name === params.name);
		setSetselectedPlan(foundedPlan);
	}, []);
	return (
		<main className='container-lg'>
			<section className='row min-vh-100'>
				<div className='col-6'>
					<h2>Detalles del {selectedPlan.title}</h2>
					{selectedPlan.items ? (
						<ComparisonCardsPlans
							detail={true}
							name={selectedPlan.name}
							button={
								selectedPlan.button ? selectedPlan.button : 'btn-secondary'
							}
							title={selectedPlan.title}
							description={selectedPlan.description}
							price={selectedPlan.price}>
							{selectedPlan.items.map((item) => (
								<ListItems
									detail={true}
									key={item.description}
									title={item.description}>
									{item.content}
								</ListItems>
							))}
						</ComparisonCardsPlans>
					) : (
						'Cargando planes...'
					)}
				</div>
				<div className='col-6'>
					<Card>
						<FormGroupDetailPlans />
					</Card>
				</div>
			</section>
		</main>
	);
};
