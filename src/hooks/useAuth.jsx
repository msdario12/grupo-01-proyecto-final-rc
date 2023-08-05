import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

// Con esto nos ahorramos de importar los 2 context,
// y solo importar useAuth

export const useAuth = () => {
	return useContext(AuthContext);
};
