import '../components/Style-About-us.css';
import { InfoAboutUs } from '../components/Info-About-us';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { HeaderTitleDashboard } from '../../dashboard/elements/HeaderTitleDashboard';

export const AboutUs = ({ title }) => {
	useDocumentTitle(title);
	return (
		<main className='container-lg d-flex flex-column justify-content-between gap-4'>
			<HeaderTitleDashboard
				title={'Donde estamos'}
				subtitle={
					'Nos encontrás en el corazón de barrio Sur de San Miguel De Tucumán'
				}
			/>
			<div style={{ width: '100%' }}>
				<iframe
					width='100%'
					height='600'
					src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=General%20Paz%20566,%20San%20Miguel%20de%20Tucuman,%20Tucuman,%20Argentina+(RollingVet)&amp;t=h&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'>
					<a href='https://www.gps.ie/car-satnav-gps/'>GPS car tracker</a>
				</iframe>
			</div>
			<HeaderTitleDashboard
				title={'Nuestra empresa'}
				subtitle={'Conoce la historia detrás de nuestra organización.'}
			/>
			<InfoAboutUs />
		</main>
	);
};
