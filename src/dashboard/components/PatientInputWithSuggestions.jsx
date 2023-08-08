import { Button, InputGroup, ListGroup, Spinner } from 'react-bootstrap';
import { InputWithFeedback } from '../../plan-details/elements/InputWithFeedback';
import { useContext, useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export const PatientInputWithSuggestions = ({
	formik,
	setIsUserInfoLoaded,
	handleClickSuggestion,
	name,
	fieldsToRender,
	endPoint,
	queryName,
	hasTextCapitalization = true,
	placeholder,
}) => {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [suggestionList, setSuggestionList] = useState();
	const { privateBackendAPI } = useAxiosPrivate();
	const [isLoading, setIsLoading] = useState(false);
	const { addToast } = useContext(ToastContext);

	const handleFocus = (e) => {
		const value = e.target.value;
		if (value.length >= 3) {
			setIsDropDownOpen(true);
		}
	};

	const handleBlur = () => {
		setTimeout(() => setIsDropDownOpen(false), 150);
	};

	const handleCleanClick = () => {
		setIsUserInfoLoaded(false);
		formik.values[name] = '';
		formik.setFieldTouched(name, false);
	};
	const handleChange = (e) => {
		const value = e.target.value;
		const valueLength = e.target.value.length;
		if (valueLength === 0) {
			formik.resetForm();
		}
		if (valueLength >= 3) {
			setIsLoading(true);
			setIsDropDownOpen(true);
			setTimeout(() => {
				privateBackendAPI
					.get(endPoint, { params: { [queryName]: value } })
					.then((res) => {
						if (!res.data.data) {
							setSuggestionList();
							setIsUserInfoLoaded(false);
							setIsLoading(false);
							return;
						}
						setIsUserInfoLoaded(true);
						console.log(res.data.data);
						setSuggestionList(res.data.data);
						setIsLoading(false);
					})
					.catch((e) => {
						addToast({
							variant: 'error',
							message: 'Error en la búsqueda ' + e,
						});
						setIsLoading(false);
					});
			}, 450);
		} else {
			setIsDropDownOpen(false);
		}
	};
	return (
		<InputGroup
			className='mb-3 d-flex flex-column'
			onChange={handleChange}
			onFocus={handleFocus}
			onBlur={handleBlur}
			autoComplete='off'>
			<div className='d-flex'>
				<InputWithFeedback
					hasTextCapitalization={hasTextCapitalization}
					noFeedback={true}
					type='text'
					placeholder={placeholder}
					formik={formik}
					name={name}
					props={{ maxLength: 40, autoComplete: 'new-password' }}
				/>

				<Button
					type='button'
					variant='outline-secondary'
					onClick={handleCleanClick}>
					Borrar
				</Button>
			</div>
			<ListGroup
				className={`shadow-lg w-100 ${
					isDropDownOpen ? 'position-absolute' : 'd-none'
				}`}
				style={{ top: 37 }}>
				{!suggestionList ? (
					isLoading ? (
						<ListGroup.Item>
							{' '}
							<Spinner
								as='span'
								animation='border'
								size='sm'
								role='status'
								aria-hidden='true'
							/>
							<span className='ms-2'>Cargando resultados</span>
						</ListGroup.Item>
					) : (
						<ListGroup.Item>No se encontraron resultados</ListGroup.Item>
					)
				) : (
					<div
						className='overflow-scroll'
						style={{ height: 275, zIndex: 10000 }}>
						{suggestionList.map((suggestion) => (
							<ListGroup.Item
								key={suggestion._id}
								type='button'
								action
								onClick={() => handleClickSuggestion(suggestion)}>
								{
									<div className='d-flex flex-column justify-content-between'>
										{fieldsToRender.map((field, index) => (
											<div
												key={field.name + index}
												className='text-muted small'>
												<span className='fw-bold'>{[field.title]}: </span>
												<span>{suggestion[field.name]}</span>
											</div>
										))}
									</div>
								}
							</ListGroup.Item>
						))}
					</div>
				)}
			</ListGroup>
		</InputGroup>
	);
};
