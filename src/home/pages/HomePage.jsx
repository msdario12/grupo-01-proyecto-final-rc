import { ProductsSection } from '../../productos/pages/ProductosSection';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ComparisonPlans } from '../components/ComparisonPlans';
import { HeroSection } from '../components/HeroSection';
import { Servicios } from '../components/Servicios';
import { TestimonialSection } from '../components/TestimonialSection';
import { OurTeam } from '../components/OurTeam';

export const HomePage = ({ title }) => {
	useDocumentTitle(title);
	return (
		<main className='container-lg'>
			<h2>Esto es el HomePage</h2>
			<HeroSection />
			<Servicios/>
			<OurTeam />
			<ComparisonPlans />
			<ProductsSection />
			<TestimonialSection />
			
		</main>
	);
};
