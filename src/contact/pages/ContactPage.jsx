import React from 'react';
import { ContactForm } from '../components/Contact-Form';
import { ContactInfo } from '../components/Contact-Info';

export const ContactPage = () => {
	return (
		<>
			<h1>Contact Page</h1>
			<div className='row container-contact-prim'>
				<div className='col-12 col-md-6'>
					<ContactForm />
				</div>
				<div className='col-12 col-md-6'>
					<ContactInfo />
				</div>
			</div>
		</>
	);
};
