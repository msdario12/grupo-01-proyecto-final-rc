import React from "react";
import Form from "react-bootstrap/Form";

export const TurnForm = () => {
  return (
    <>
      <h2>Reserva tu turno</h2>

      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Juan" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" placeholder="Perez" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Telefono</Form.Label>
          <Form.Control type="number" placeholder="3811234567" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo Electronico</Form.Label>
          <Form.Control type="email" placeholder="juanperez026@gmail.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="animal">
          <Form.Label>Animal</Form.Label>
          <Form.Control type="text" placeholder="Perro" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="race">
          <Form.Label>Raza</Form.Label>
          <Form.Control type="text" placeholder="Doberman" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="namepet">
          <Form.Label>Nombre de la mascota</Form.Label>
          <Form.Control type="email" placeholder="Kokito" />
        </Form.Group>
        <Form.Select aria-label="Default select example">
          <option>Edad de la mascota</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descripcion del problema</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>

    </>
  );
};
