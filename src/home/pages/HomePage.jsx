import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { AdvertisingPizza } from '../components/AdvertisingPizza';
import { AdvertisingWhater } from '../components/AdvertisingWhater';
import { ComparisonPlans } from '../components/ComparisonPlans';
import { HeroSection } from '../components/HeroSection';
import { TestimonialSection } from '../components/TestimonialSection';

export const HomePage = ({ title }) => {
	useDocumentTitle(title);
	return (
		<main className='container-lg'>
			<h2>Esto es el HomePage</h2>
			<HeroSection />
			<AdvertisingPizza />
			<ComparisonPlans />
			<TestimonialSection />
			<AdvertisingWhater />
		</main>
	);
};
