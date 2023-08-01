import { useState } from 'react';
import { Button, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { InputWithFeedback } from '../../plan-details/elements/InputWithFeedback';
import { backendAPI } from '../../api/backendAPI';

export const UsersInputsForm = ({
	formik,
	setIsUserInfoLoaded,
	isUserInfoLoaded,
}) => {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [suggestionList, setSuggestionList] = useState();

	const handleFocusEmail = (e) => {
		const value = e.target.value;
		if (value.length >= 3) {
			setIsDropDownOpen(true);
		}
	};

	const handleClickSuggestion = (suggestion) => {
		console.log(suggestion);
		setIsUserInfoLoaded(true);
		formik.values.email = suggestion.email;
		formik.values.firstName = suggestion.firstName;
		formik.setFieldTouched('firstName', true);

		formik.values.lastName = suggestion.lastName;
		formik.setFieldTouched('lastName', true);

		formik.values.phone = suggestion.phone;
		formik.setFieldTouched('phone', true);
	};
	const handleBlur = () => {
		setTimeout(() => setIsDropDownOpen(false), 150);
	};

	const cleanEmailClick = () => {
		setIsUserInfoLoaded(false);
		formik.values.email = '';
		formik.setFieldTouched('email', false);
	};
	const handleChangeEmail = (e) => {
		const value = e.target.value;
		if (e.target.value.length >= 3) {
			setIsDropDownOpen(true);
			backendAPI.get('/api/users', { params: { email: value } }).then((res) => {
				if (!res.data.data) {
					setSuggestionList();
					setIsUserInfoLoaded(false);
					return;
				}
				setSuggestionList(res.data.data);
			});
		} else {
			setIsDropDownOpen(false);
			setIsUserInfoLoaded(false);
		}
	};
	return (
		<>
			<Form.Group className='mb-3' controlId='email'>
				<Form.Label>Email *</Form.Label>
				<InputGroup
					className='mb-3 d-flex flex-column'
					onChange={handleChangeEmail}
					onFocus={handleFocusEmail}
					onBlur={handleBlur}
					autoComplete='off'>
					<div className='d-flex'>
						<InputWithFeedback
							hasTextCapitalization={false}
							noFeedback={true}
							type='text'
							placeholder='Busque un email'
							formik={formik}
							name={'email'}
							props={{ maxLength: 40, autoComplete: 'new-password' }}
						/>

						<Button
							type='button'
							variant='outline-secondary'
							onClick={cleanEmailClick}>
							Borrar
						</Button>
					</div>
					<ListGroup
						className={`shadow-lg w-100 ${
							isDropDownOpen ? 'position-absolute' : 'd-none'
						}`}
						style={{ top: 37 }}>
						{!suggestionList ? (
							<ListGroup.Item>No existe el email buscado</ListGroup.Item>
						) : (
							suggestionList.map((suggestion) => (
								<ListGroup.Item
									type='button'
									key={suggestion._id}
									action
									onClick={() => handleClickSuggestion(suggestion)}>
									{suggestion.email}
								</ListGroup.Item>
							))
						)}
					</ListGroup>
				</InputGroup>
			</Form.Group>

			<Row>
				<Form.Group
					as={Col}
					sm={12}
					lg={6}
					className='mb-3'
					controlId='firstName'>
					<Form.Label>Nombre *</Form.Label>
					<InputWithFeedback
						type='text'
						placeholder='Ramiro'
						formik={formik}
						name={'firstName'}
						props={{ maxLength: 40, disabled: isUserInfoLoaded }}
					/>
				</Form.Group>

				<Form.Group
					as={Col}
					sm={12}
					lg={6}
					className='mb-3'
					controlId='lastName'>
					<Form.Label>Apellido *</Form.Label>
					<InputWithFeedback
						type='text'
						placeholder='Perez'
						formik={formik}
						name={'lastName'}
						props={{ maxLength: 40, disabled: isUserInfoLoaded }}
					/>
				</Form.Group>
			</Row>

			<Form.Group className='mb-3' controlId='phone'>
				<Form.Label>Número de teléfono *</Form.Label>
				<InputWithFeedback
					type='tel'
					onChange={(e) => console.log(e)}
					placeholder='38135222115'
					formik={formik}
					name={'phone'}
					props={{
						maxLength: 15,
						disabled: isUserInfoLoaded,
					}}
				/>
			</Form.Group>
		</>
	);
};
