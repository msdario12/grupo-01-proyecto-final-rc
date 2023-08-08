import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDateCustom = (date) => {
	const obj = new Date(date);
	return format(obj, 'P', { locale: es });
};
export const formatTimeCustom = (date) => {
	const obj = new Date(date);
	return format(obj, 'p', { locale: es });
};
