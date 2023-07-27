import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "../../hooks/useForm";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  description: "",
};
const validationsForm = (form) => {
  let errors = {};

  if (!form.name.trim()) {
    errors.name = "* El campo 'Nombre y apellido' es requerido";
  }

  return errors;
};

export const ContactForm = () => {
  const { form, errors, response, handleBlur, handleSubmit, handleChange } =
    useForm(initialForm, validationsForm);

  return (
    <>
      <div className="contact-form-container mt-5 p-2">
        <h2>Obten tu consulta online</h2>
        <Form className="mb-5" onSubmit={handleSubmit}>
          <div className="row">
            <Form.Group className="mb-3 col-12 col-md-6" controlId="name">
              <Form.Label>Nombre y Apellido</Form.Label>
              <Form.Control
                type="text"
                max="38"
                min="1"
                required
                placeholder="Jose Paz"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.name}
              />

              {errors.name && (<p className="validation-errors">{errors.name}</p>)}

            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-6" controlId="phone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="3811234567"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.phone}
              />

              {errors.phone && (<p className="validation-errors">{errors.name}</p>)}

            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="josepaz@gmail.com"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.email}
            />

            {errors.email && <p className="validation-errors">{errors.name}</p> }

          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripcion de la consulta</Form.Label>
            <Form.Control
              className="text-area-edit"
              as="textarea"
              required
              max="500"
              placeholder="Redacta tu consulta con el nombre, especie de tu mascota y la edad."
              rows={3}
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.description}
            />

            {errors.description && <p className="validation-errors">{errors.name}</p>}

          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar consulta
          </Button>
        </Form>
      </div>
    </>
  );
};
