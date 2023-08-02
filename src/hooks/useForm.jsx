import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { backendAPI } from "../api/backendAPI";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const [isFormComplete, setIsFormComplete] = useState(false);

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

  const handleSubmit = async (e) => {
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

    try {
			const resp = await backendAPI.post('/contact', {
				name,
        phone,
				email,
				description,
			});


			console.log(resp);
		} catch (error) {
			console.log(error);
		}

  };

  return {
    form,
    errors,
    isFormComplete,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
