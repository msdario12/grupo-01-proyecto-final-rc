import React from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


export const TestimonialSection = () => {
  return (
    <>
    
    <h2 ></h2>

    <CardGroup>
      <Card className='me-2 mb-5'>
        <Card.Img variant="top" src="https://www.copycat.dev/blog/wp-content/uploads/2022/12/rc.png" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card className='me-2 mb-5'>
        <Card.Img variant="top" src="https://www.copycat.dev/blog/wp-content/uploads/2022/12/rc.png" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card className='me-2 mb-5'>
        <Card.Img variant="top" src="https://www.copycat.dev/blog/wp-content/uploads/2022/12/rc.png" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>
    
    </>
  )
}
