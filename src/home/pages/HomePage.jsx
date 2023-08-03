import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ComparisonPlans } from '../components/ComparisonPlans';
import { HeroSection } from '../components/HeroSection';
import { TestimonialSection } from '../components/TestimonialSection';

export const HomePage = ({ title }) => {
	useDocumentTitle(title);
	return (
		<main className='container-lg'>
			<h2>Esto es el HomePage</h2>
			<HeroSection />
			<ComparisonPlans />
			<TestimonialSection />
		</main>
	);
};
