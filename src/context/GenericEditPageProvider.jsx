import { useContext, useEffect, useState } from 'react';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';
import { ToastContext } from './ToastContext';
import { GenericEditPageContext } from './GenericEditPageContext';

export const GenericEditPageProvider = ({ props, children }) => {
	const [data, setData] = useState();
	const { privateBackendAPI } = useAxiosPrivate();
	const { addToast } = useContext(ToastContext);
	useEffect(() => {
		if (props.show) {
			privateBackendAPI
				.get(`${props.endPoint + props.selectID}`)
				.then((res) => {
					setData(res.data.data);
				});
			// .catch((e) => {
			// 	console.error(e);

			// 	addToast({
			// 		message: 'Error al recibir los datos' + e,
			// 		variant: 'error',
			// 	});
			// });
		}
	}, [props]);

	return (
		<GenericEditPageContext.Provider value={{ data }}>
			{children}
		</GenericEditPageContext.Provider>
	);
};
