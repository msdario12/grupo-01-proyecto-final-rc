import { BannerAboutUs } from '../components/Banner-About-Us';
import '../components/Style-About-us.css';
import { InfoAboutUs } from '../components/Info-About-us';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AboutUs = ({ title }) => {
	useDocumentTitle(title);
	return (
		<>
			<h1>About-Us</h1>
			<BannerAboutUs />
			<InfoAboutUs />
		</>
	);
};
