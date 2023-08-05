import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useContext, useEffect } from 'react';
import { ModalContext } from '../../context/ModalContext';

// Con esto redireccionamos en caso de no contar con
// los permisos para ir a la ruta protegida

// El state y replace nos permite poder volver a la ultima pagina donde estaba el usuario

// Podemos recibir el rol que es admitido y luego chequear si el rol existe para acceder

export const RequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const { setIsModalOpen } = useContext(ModalContext);

	useEffect(() => {
		if (auth?.accessToken) {
			return;
		}
		if (location?.state?.prevUrl?.pathname) {
			navigate(location.state.prevUrl.pathname);
			setIsModalOpen(true);
			return;
		}
		navigate('/unauthorized-page', { replace: true });
		setIsModalOpen(true);
	}, [auth]);

	return <Outlet />;
};
