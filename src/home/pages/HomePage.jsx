import { useEffect } from 'react';
import { ComparisonPlans } from '../components/ComparisonPlans';
import { HeroSection } from '../components/HeroSection';
import { TestimonialSection } from '../components/TestimonialSection';

export const HomePage = ({ title }) => {
	useEffect(() => {
		document.title = title;
	}, [title]);
	return (
		<main className='container-lg'>
			<h2>Esto es el HomePage</h2>
			<HeroSection />
			<ComparisonPlans />
			<TestimonialSection />
		</main>
	);
};
