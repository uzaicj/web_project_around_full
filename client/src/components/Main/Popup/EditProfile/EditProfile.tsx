import { useContext, useState } from "react";

import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useFormValidation } from "../../../../hooks/useFormValidation";

export default function EditProfile(): React.JSX.Element {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");

  const { errors, isFormValid, handleInputValidation } = useFormValidation([
    "name",
    "description",
  ]);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className={`popup__input popup__input_type_name ${
          errors.name ? "popup__input_type_error" : ""
        }`}
        name="name"
        id="profileName"
        placeholder="Nombre"
        type="text"
        minLength={2}
        maxLength={40}
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          handleInputValidation(e);
        }}
      />

      <span
        className={`profileName-input-error popup__input-error ${
          errors.name ? "popup__input-error_active" : ""
        }`}
      >
        {errors.name}
      </span>

      <input
        className={`popup__input popup__input_type_description ${
          errors.description ? "popup__input_type_error" : ""
        }`}
        name="description"
        id="profileDescription"
        placeholder="Acerca de mí"
        type="text"
        minLength={2}
        maxLength={200}
        required
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          handleInputValidation(e);
        }}
      />

      <span
        className={`profileDescription-input-error popup__input-error ${
          errors.description ? "popup__input-error_active" : ""
        }`}
      >
        {errors.description}
      </span>

      <button
        className={`button popup__button ${
          !isFormValid ? "popup__button_disabled" : ""
        }`}
        type="submit"
        disabled={!isFormValid}
      >
        Guardar
      </button>
    </form>
  );
}
