import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { vetPlans } from '../../../vetPlansDB';

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
				<div className='col-4'>
					<h2>Detalles del {selectedPlan.title}</h2>
					
				</div>
				<div className='col-8'>s</div>
			</section>
		</main>
	);
};
