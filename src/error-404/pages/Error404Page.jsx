import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const Error404Page = ({ title }) => {
	useDocumentTitle(title);
	return (
		<div>
			<h2>Pagina de error 404</h2>
		</div>
	);
};
