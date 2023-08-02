import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

// Con esto redireccionamos en caso de no contar con
// los permisos para ir a la ruta protegida

export const RequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();
	return auth?.user ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};
