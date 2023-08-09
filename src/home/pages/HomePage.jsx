import { ProductsSection } from '../../productos/pages/ProductosSection';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ComparisonPlans } from '../components/ComparisonPlans';
import { HeroSection } from '../components/HeroSection';
import { Servicios } from '../components/Servicios';
import { TestimonialSection } from '../components/TestimonialSection';
import { OurTeam } from '../components/OurTeam';
import { HeaderTitleDashboard } from '../../dashboard/elements/HeaderTitleDashboard';

export const HomePage = ({ title }) => {
	useDocumentTitle(title);
	return (
		<main className='d-flex flex-column gap-4'>
			<HeroSection />
			<div className='min-vh-100 100 d-flex flex-column gap-4 justify-content-around'>
				<div className='container-lg'>
					<HeaderTitleDashboard
						title={'Gente que confío en nostros'}
						subtitle={
							'Testimonios de personas que pusieron en nuestras manos a sus mascotas'
						}
					/>
					<TestimonialSection />
					<HeaderTitleDashboard
						title={'Servicios que ofrecemos'}
						subtitle={
							'Algunos de los servicios que ofrecemos para le cuidado de tu mascota.'
						}
					/>
				</div>
				<Servicios />
			</div>
			<div className='container-lg min-vh-100  d-flex flex-column gap-4 justify-content-center'>
				<HeaderTitleDashboard
					title={'Nuestro equipo'}
					subtitle={'Profesionales al servicio de tus necesidades'}
				/>
				<OurTeam />
			</div>
			<div className='w-100 bg-primary min-vh-100 d-flex flex-column gap-4 justify-content-center'>
				<div className='container-lg' id='plans-section'>
					<div className='text-light'>
						<HeaderTitleDashboard
							title={'Planes mensuales'}
							subtitle={
								'Pensado en las necesidades de tu mascota en todas sus edades.'
							}
						/>
					</div>
					<ComparisonPlans />
				</div>
			</div>
			<div className='container-lg min-vh-100 d-flex flex-column gap-4 justify-content-center'>
				<HeaderTitleDashboard
					title={'Productos'}
					subtitle={
						'Elegí entre algunos de los productos que ofrecemos, podes retirarlos en tu proxima consulta.'
					}
				/>
				<ProductsSection />
			</div>
		</main>
	);
};
