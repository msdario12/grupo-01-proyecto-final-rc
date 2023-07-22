import { useParams } from 'react-router';

export const DetailPlansPage = () => {
	const params = useParams();
	return (
		<div>
			<h2>DetailPlansPage</h2>
			<p>{params.name}</p>
		</div>
	);
};
