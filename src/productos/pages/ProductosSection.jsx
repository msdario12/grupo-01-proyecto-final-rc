import Card from 'react-bootstrap/Card';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const productContent = [
	{
		src: 'https://i.ibb.co/T41D9R8/144781-5fecbb4a5096d4b5d816814828401275-640-0.webp',
		title: 'Comedero con bebedero',
		price: '$2.500,50',
		rating: 5,
	},
	{
		src: 'https://i.ibb.co/4M3ZH36/501211-791ab23d61f76280b816814740850544-640-0.webp',
		title: 'Buho con chifle',
		price: '$3.200,80',
		rating: 4,
	},
	{
		src: 'https://i.ibb.co/q5kDTx5/fase-2-51-5f5b655585267fed7916243086274308-640-0.webp',
		title: 'Comedero de Plástico',
		price: '$1.500,60',
		rating: 3,
	},
	{
		src: 'https://i.ibb.co/BCgN3fc/133761-c2d2f05832af44de0916802728721395-640-0.webp',
		title: 'Elefante peluche',
		price: '$3.500,00',
		rating: 4,
	},
	{
		src: 'https://i.ibb.co/bLHZy5h/fase-1-841-0c2e13fa0b3892e0f516235935253901-640-0.webp',
		title: 'Hueso de cuero',
		price: '$1.200,00',
		rating: 4,
	},
];

export const ProductsSection = () => {
	return (
		<>
			<h2 className='text-center display-5 fw-bold mb-3'>Productos</h2>

			<div className='row justify-content-center gap-md-3 gap-sm-3 m-0'>
				{productContent.map((product) => (
					<Card
						key={product.title}
						className='col-12 col-lg-6 p-0 mb-3 mx-2 h-100'
						style={{ width: '12rem' }}>
						<Card.Img variant='top' src={product.src} />
						<Card.Header>
							<Card.Body>
								<Card.Title>{product.title}</Card.Title>
							</Card.Body>
						</Card.Header>
						<Card.Footer className='d-flex flex-column'>
							<div>
								{Array(product.rating).fill(<FontAwesomeIcon icon={faStar} />)}
							</div>
							<div>
								<span className='fs-5'>{product.price}</span>
							</div>
						</Card.Footer>
					</Card>
				))}
			</div>
		</>
	);
};
