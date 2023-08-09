import { ContactForm } from '../components/Contact-Form';
import { ContactInfo } from '../components/Contact-Info';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const ContactPage = ({ title }) => {
	useDocumentTitle(title);
	return (
		<div className='container-lg'>
			<div className='row container-contact-prim'>
				<div className='col-12 col-md-6'>
					<ContactForm />
				</div>
				<div className='col-12 col-md-6'>
					<ContactInfo />
				</div>
			</div>
		</div>
	);
};
