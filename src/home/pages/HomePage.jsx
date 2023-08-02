import { ComparisonPlans } from '../components/ComparisonPlans';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/HeroSection';

export const HomePage = () => {
	return (
		<main className='container-lg'>
			<h2>Esto es el HomePage</h2>
			<HeroSection />
			<ComparisonPlans />
			<Footer />
		</main>
	);
};
