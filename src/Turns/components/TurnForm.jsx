import React from "react";
import Form from "react-bootstrap/Form";

export const TurnForm = () => {
  return (
    <>
      <div className="p-2 w-50 m-auto">
        <h2>Reserva tu turno</h2>

        <Form>
          <div className="row">
            <Form.Group className="mb-3 col-6" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Juan" />
            </Form.Group>

            <Form.Group className="mb-3 col-6" controlId="lastname">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder="Perez" />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="mb-3 col-6" controlId="phone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="number" placeholder="3811234567" />
            </Form.Group>

            <Form.Group className="mb-3 col-6" controlId="email">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control type="email" placeholder="juanperez026@gmail.com" />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="mb-3 col-6" controlId="animal">
              <Form.Label>Animal</Form.Label>
              <Form.Control type="text" placeholder="Perro" />
            </Form.Group>

            <Form.Group className="mb-3 col-6" controlId="race">
              <Form.Label>Raza</Form.Label>
              <Form.Control type="text" placeholder="Doberman" />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="namepet">
            <Form.Label>Nombre de la mascota</Form.Label>
            <Form.Control type="email" placeholder="Kokito" />
          </Form.Group>

          <Form.Select aria-label="Default select example" className="mb-3">
            <option>Tamaño de la mascota</option>
            <option value="1">Pequeño</option>
            <option value="2">Mediano</option>
            <option value="3">Grande</option>
          </Form.Select>

          <Form.Select aria-label="Default select example" className="mb-3">
            <option>Edad de la mascota</option>
            <option value="1">Cachorro - 0 a 6 meses</option>
            <option value="2">Adolecente - 8 a 19 meses</option>
            <option value="3">Adulto - 20 meses</option>
          </Form.Select>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripcion de la consulta</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </div>
    </>
  );
};
