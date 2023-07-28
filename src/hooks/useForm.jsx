import { useState } from "react";
import Swal from "sweetalert2";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});

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

  };

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
