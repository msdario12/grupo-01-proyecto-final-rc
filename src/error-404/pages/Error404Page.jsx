import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom";
import error from "../../Assets/Error404Page/Error404Page.jpg";

import "./Error404Page.css"



export const Error404Page = () => {
  useDocumentTitle(title);
	return (
		<Container className="Container" >
      <h1 className="NoDisponible">Pagina Web No Disponible</h1>
		<div className="my-5 text-center">
        <img className="Error404 my-3 img-fluid" src={error} alt="Error 404 pagina no se ecuentra disponible" />
        <div className="text-center">
          <Link to="/" className="btn-ingresar text-decoration-none  my-2">Volver </Link>
        </div>
      </div>
		</Container>
	);
};
export default Error404Page;
