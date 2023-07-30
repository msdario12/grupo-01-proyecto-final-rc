import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const [isFormComplete, setIsFormComplete] = useState(false);

  const [hasErrors, setHasErrors] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  useEffect(() => {
    const isComplete = Object.values(form).every((value) => value !== "");
    setIsFormComplete(isComplete);
  }, [form]);
  
  useEffect(() => {
    const errorsExist = Object.keys(errors).length > 0;
    setHasErrors(errorsExist);
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));

    if (Object.keys(errors).length === 0) {
      Swal.fire({
        title: 'Consulta enviada',
        text: 'Su consulta se envio con exito',
        icon: 'success',
        confirmButtonColor: '#0d6efd',
      });
    };

    setForm(initialForm);

    //Falta la logica para enviar a la base de datos

  };

  return {
    form,
    errors,
    isFormComplete,
    hasErrors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
