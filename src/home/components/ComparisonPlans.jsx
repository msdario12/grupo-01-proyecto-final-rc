// Este objeto sera reemplazado por la base de datos, luego se borra
import { vetPlans } from '../../../vetPlansDB';
import { ListItems } from '../elements/ListItems';
import { ComparisonCardsPlans } from '../elements/ComparisonCardsPlans';

import React from 'react';

export const DetailListItems = () => {
	return <div>DetailListItems</div>;
};

export const ComparisonPlans = () => {
	return (
		<section className='row mb-5'>
			<h2 className='text-center display-5 fw-bold mb-5'>
				Planes que ofrecemos
			</h2>
			{vetPlans.map((plan) => (
				<div key={plan.title} className='col-12 col-md-4 mb-2'>
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
					</ComparisonCardsPlans>
				</div>
			))}
		</section>
	);
};
