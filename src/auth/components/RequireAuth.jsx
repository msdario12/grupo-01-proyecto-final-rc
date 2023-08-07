import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useContext, useEffect } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

// Con esto redireccionamos en caso de no contar con
// los permisos para ir a la ruta protegida

// El state y replace nos permite poder volver a la ultima pagina donde estaba el usuario

// Podemos recibir el rol que es admitido y luego chequear si el rol existe para acceder

export const RequireAuth = () => {
	const { auth, setAuth } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const { setIsModalOpen } = useContext(ModalContext);
	const { privateBackendAPI } = useAxiosPrivate();

	useEffect(() => {
		// Se logeo recién y el token esta en memoria
		if (auth?.accessToken) {
			return;
		}
		// se recarga la pagina, levanto el token del ls
		// leo el token, envio al backend para ver si es valido y en caso afirmativo, seteo el estado de auth
		const accessToken = localStorage.getItem('token');
		privateBackendAPI
			.post(
				'/api/auth/validate',
				{},
				{
					headers: { Authorization: 'Bearer ' + accessToken },
				}
			)
			.then((res) => {
				console.log(res.data);
				if (res.data.success) {
					const { firstName, role, email } = res.data;
					setAuth({ firstName, role, email, accessToken });
					return;
				}
			})
			.catch(() => {
				if (location?.state?.prevUrl?.pathname) {
					navigate(location.state.prevUrl.pathname);
					setIsModalOpen(true);
					return;
				}

				navigate('/unauthorized-page', { replace: true });
				setIsModalOpen(true);
				return;
			});
	}, [auth, location]);

	return <Outlet />;
};
