import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { vetPlans } from '../../../vetPlansDB';
import { ComparisonCardsPlans } from '../../home/elements/ComparisonCardsPlans';
import { ListItems } from '../../home/elements/ListItems';

import { FormGroupDetailPlans } from '../components/FormGroupDetailPlans';

export const DetailPlansPage = () => {
	const params = useParams();
	const [selectedPlan, setSetselectedPlan] = useState({});
	useEffect(() => {
		const foundedPlan = vetPlans.find((plan) => plan.name === params.name);
		setSetselectedPlan(foundedPlan);
	}, [params.name]);

	return (
		<main className='container-lg min-vh-100 d-flex'>
			<section className='row align-content-center'>
				{selectedPlan.items ? (
					<>
						<div className='col-6'>
							{
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
							}
						</div>
						<div className='col-6'>
							<FormGroupDetailPlans selectedPlan={selectedPlan} />
						</div>
					</>
				) : (
					'Cargando datos...'
				)}
			</section>
		</main>
	);
};
