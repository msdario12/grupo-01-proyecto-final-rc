import { useState } from "react";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({ second });

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {};

  const handleBlur = (e) => {};

  const handleSubmit = (e) => {};

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
