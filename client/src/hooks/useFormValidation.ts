import { useState } from "react";

type ValidationErrors = Record<string, string>;
type FieldValidity = Record<string, boolean>;

export function useFormValidation(fields: string[]) {
  const initialValidity = fields.reduce<FieldValidity>(
    (state, field) => {
      state[field] = false;
      return state;
    },
    {}
  );

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [validity, setValidity] = useState<FieldValidity>(initialValidity);

  const handleInputValidation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, validity, validationMessage } = event.target;

    setErrors((state) => ({
      ...state,
      [name]: validity.valid ? "" : validationMessage,
    }));

    setValidity((state) => ({
      ...state,
      [name]: validity.valid,
    }));
  };

  const isFormValid = Object.values(validity).every(Boolean);

  return {
    errors,
    isFormValid,
    handleInputValidation,
  };
}