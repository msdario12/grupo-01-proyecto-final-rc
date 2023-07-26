import React from 'react'
import { ContactInfo } from '../components/Contact-Info'
import '../components/Style-Contact.css'
import { ContactForm } from '../components/Contact-Form'

export const ContactPage = () => {
  return (
    <>

      <h1>Contact Page</h1>
      <div className="row container-contact-prim">
        <div className='col-12 col-md-6'>
          <ContactForm />
        </div>
        <div className='col-12 col-md-6'>
          <ContactInfo />
        </div>
      </div>
    </>
  )
}
