import React from 'react'
import Card from 'react-bootstrap/Card';


export const ProductosPage = () => {
    return (
        <>
            <h2 className='text-center display-5 fw-bold mb-3'>Productos</h2>

            <div className='row d-flex flex-md-row justify-content-center gap-md-5 gap-sm-5  m-0'>


                <Card className='col-12 col-lg-6 p-0 mb-5 h-100' style={{ width: '12rem' }}>
                    <Card.Img variant='top' src='https://i.ibb.co/T41D9R8/144781-5fecbb4a5096d4b5d816814828401275-640-0.webp' />
                    <Card.Header>
                        <Card.Body>
                            <Card.Title>Comedero con bebedero</Card.Title>

                        </Card.Body>
                    </Card.Header>
                    <Card.Footer>
                        $2.500,50
                    </Card.Footer>
                </Card>

                <Card className='col-12 col-lg-6 p-0 mb-5 h-100' style={{ width: '12rem' }}>
                    <Card.Img variant='top' src='https://i.ibb.co/4M3ZH36/501211-791ab23d61f76280b816814740850544-640-0.webp' />
                    <Card.Header>
                        <Card.Body>
                            <Card.Title>Buho con chifle</Card.Title>

                        </Card.Body>
                    </Card.Header>
                    <Card.Footer>
                        $3.200
                    </Card.Footer>
                </Card>


                <Card className='col-12 col-lg-6 p-0 mb-5 h-100' style={{ width: '12rem' }}>
                    <Card.Img variant='top' src='https://i.ibb.co/q5kDTx5/fase-2-51-5f5b655585267fed7916243086274308-640-0.webp' />
                    <Card.Header>
                        <Card.Body>
                            <Card.Title>Comedero de Plastico</Card.Title>

                        </Card.Body>
                    </Card.Header>
                    <Card.Footer>
                        $1.500,60
                    </Card.Footer>
                </Card>



                <Card className='col-12 col-lg-6 p-0 mb-5 h-100' style={{ width: '12rem' }}>
                    <Card.Img variant='top' src='https://i.ibb.co/BCgN3fc/133761-c2d2f05832af44de0916802728721395-640-0.webp' />
                    <Card.Header>
                        <Card.Body>
                            <Card.Title>Elefante peluche</Card.Title>

                        </Card.Body>
                    </Card.Header>
                    <Card.Footer>
                        $3.500
                    </Card.Footer>
                </Card>


                <Card className='col-12 col-lg-6 p-0 mb-5 h-100 ' style={{ width: '12rem' }}>
                    <Card.Img variant='top' src='https://i.ibb.co/bLHZy5h/fase-1-841-0c2e13fa0b3892e0f516235935253901-640-0.webp' />
                    <Card.Header>
                        <Card.Body>
                            <Card.Title>Hueso de cuero</Card.Title>

                        </Card.Body>
                    </Card.Header>
                    <Card.Footer>
                        $1.200,400
                    </Card.Footer>
                </Card>

            </div>

        </>
    )
}
