import * as Yup from 'yup';

export const userSchema = {
	firstName: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[\w\-\s]+$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	lastName: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[\w\-\s]+$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	email: Yup.string()
		.email('Introduzca un email valido')
		.required('Campo obligatorio'),
	phone: Yup.string()
		.matches(
			// eslint-disable-next-line no-useless-escape
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
			'Introduce un número de teléfono válido'
		)
		.min(3, 'Mínimo de 3 caracteres')
		.max(15, 'Máximo de 15 caracteres')
		.required('Campo obligatorio'),
};
