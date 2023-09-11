import { Col, Form, Row } from 'react-bootstrap';
import { InputWithFeedback } from '../../../plan-details/elements/InputWithFeedback';
import { useEffect } from 'react';
import { PatientInputWithSuggestions } from './PatientInputWithSuggestions';

export const UsersInputsForm = ({
    formik,
    setIsUserInfoLoaded,
    isUserInfoLoaded,
    editMode = false,
}) => {
    const handleClickSuggestion = (suggestion) => {
        setIsUserInfoLoaded(true);
        formik.values.email = suggestion.email;
        formik.values.firstName = suggestion.firstName;
        formik.setFieldTouched('firstName', true);

        formik.values.lastName = suggestion.lastName;
        formik.setFieldTouched('lastName', true);

        formik.values.phone = suggestion.phone;
        formik.setFieldTouched('phone', true);
    };
    useEffect(() => {
        if (!isUserInfoLoaded) {
            formik.values.phone = '';
            formik.values.firstName = '';
            formik.values.lastName = '';
        }
    }, [isUserInfoLoaded]);
    return (
        <>
            <Form.Group className='mb-3' controlId='email'>
                {!editMode ? (
                    <>
                        <Form.Label>Email *</Form.Label>
                        <PatientInputWithSuggestions
                            formik={formik}
                            setIsUserInfoLoaded={setIsUserInfoLoaded}
                            handleClickSuggestion={handleClickSuggestion}
                            name={'email'}
                            fieldsToRender={[
                                { name: 'email', title: 'Email' },
                                { name: 'firstName', title: 'Nombre' },
                                { name: 'lastName', title: 'Apellido' },
                            ]}
                            endPoint='/api/users'
                            queryName='email'
                            hasTextCapitalization={false}
                            placeholder={'Busque un email'}
                        />
                    </>
                ) : (
                    <Form.Group
                        as={Col}
                        sm={12}
                        lg={6}
                        className='mb-3'
                        controlId='email'>
                        <Form.Label>Email *</Form.Label>
                        <InputWithFeedback
                            hasTextCapitalization={false}
                            type='text'
                            placeholder='Ramiro'
                            formik={formik}
                            name={'email'}
                            props={{ maxLength: 40, disabled: isUserInfoLoaded }}
                        />
                    </Form.Group>
                )}
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
