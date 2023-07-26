import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export const ContactForm = () => {
    return (
        <>

            <div className='contact-form-container mt-5'>
                <h2>Obten tu consulta online</h2>
                <Form className='mb-5'>
                    <Form.Group className="col-12 col-md-6 mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre y Apellido</Form.Label>
                        <Form.Control type="text" max="38" min="1" required placeholder="Jose Paz" />
                    </Form.Group>
                    <Form.Group className="col-12 col-md-6 mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Correo electronico</Form.Label>
                        <Form.Control type="email" required placeholder="josepaz@gmail.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" required max="500" placeholder='Redacta tu consulta con el nombre, especie de tu mascota y la edad' rows={3} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar consulta
                    </Button>
                </Form>
            </div>

        </>
    )
}
