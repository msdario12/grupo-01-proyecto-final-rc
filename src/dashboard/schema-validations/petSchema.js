import * as Yup from 'yup';
import { animalsSpecies } from '../../plan-details/components/FormGroupDetailPlans';

export const petSchema = {
	name: Yup.string()
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[a-zA-Z0-9]*$/, 'Sólo letras del alfabeto')
		.required('Campo obligatorio'),
	specie: Yup.string()
		.required('Campo obligatorio')
		.oneOf(
			animalsSpecies.map((animal) => animal.value),
			'Selecciona una especie de la lista'
		),
	race: Yup.string()
		.required('Campo obligatorio')
		.min(3, 'Mínimo de 3 caracteres')
		.max(35, 'Máximo de 35 caracteres')
		.matches(/^[a-zA-Z0-9]*$/, 'Sólo letras del alfabeto'),
};
