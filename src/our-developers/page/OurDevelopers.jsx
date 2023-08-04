import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export const OurDevelopers = () => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="https://i.ibb.co/BVR0JWH/as.jpg" />
        <Card.Body>
          <Card.Title>Homet Matias</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Bueno en Front</ListGroup.Item>
          <ListGroup.Item>Flojo en Backend (Mejorando)</ListGroup.Item>
          <ListGroup.Item>Responsable</ListGroup.Item>
          <ListGroup.Item>Impuntual (Mejorando)</ListGroup.Item>
        </ListGroup>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="https://i.ibb.co/7Gcrc0w/perfil-dario.jpg" />
        <Card.Body>
          <Card.Title>Dario Mansilla</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Bueno en Front</ListGroup.Item>
          <ListGroup.Item>Bueno en Backend</ListGroup.Item>
          <ListGroup.Item>Responsable</ListGroup.Item>
          <ListGroup.Item>Puntual</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};
