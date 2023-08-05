import { Button, InputGroup, ListGroup } from 'react-bootstrap';
import { InputWithFeedback } from '../../plan-details/elements/InputWithFeedback';
import { useContext, useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import { backendAPI } from '../../api/backendAPI';

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
		if (e.target.value.length >= 3) {
			setIsDropDownOpen(true);
			backendAPI
				.get(endPoint, { params: { [queryName]: value } })
				.then((res) => {
					if (!res.data.data) {
						setSuggestionList();
						setIsUserInfoLoaded(false);
						return;
					}
                    console.log(res.data.data);
					setSuggestionList(res.data.data);
				})
				.catch((e) =>
					addToast({
						variant: 'error',
						message: 'Error en la búsqueda ' + e,
					})
				);
		} else {
			setIsDropDownOpen(false);
			setIsUserInfoLoaded(false);
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
					<ListGroup.Item>No se encontraron resultados</ListGroup.Item>
				) : (
					suggestionList.map((suggestion) => (
						<ListGroup.Item
							type='button'
							key={suggestion._id}
							action
							onClick={() => handleClickSuggestion(suggestion)}>
							{
								<div className='d-flex flex-column justify-content-between'>
									{fieldsToRender.map((field, index) => (
										<div key={field.name + index} className='text-muted small'>
											<span className='fw-bold'>{[field.title]}: </span>
											<span>{suggestion[field.name]}</span>
										</div>
									))}
								</div>
							}
						</ListGroup.Item>
					))
				)}
			</ListGroup>
		</InputGroup>
	);
};
