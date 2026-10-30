import { useContext, useState } from "react";

import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useFormValidation } from "../../../../hooks/useFormValidation";

export default function NewCard(): React.JSX.Element {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const { errors, isFormValid, handleInputValidation } =
    useFormValidation(["name", "link"]);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleAddPlaceSubmit({
      name,
      link,
    });
  };

  return (
    <form
      className="popup__form"
      id="new-card-form"
      name="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="card-name"
          className={`popup__input popup__input_type_card-name ${
            errors.name ? "popup__input_type_error" : ""
          }`}
          name="name"
          placeholder="Título"
          minLength={2}
          maxLength={30}
          required
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleInputValidation(e);
          }}
        />

        <span
          className={`popup__error ${
            errors.name ? "popup__input-error_active" : ""
          }`}
          id="card-name-error"
        >
          {errors.name}
        </span>
      </label>

      <label className="popup__field">
        <input
          id="card-url"
          className={`popup__input popup__input_type_url ${
            errors.link ? "popup__input_type_error" : ""
          }`}
          name="link"
          placeholder="Enlace de la imagen"
          required
          type="url"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            handleInputValidation(e);
          }}
        />

        <span
          className={`popup__error ${
            errors.link ? "popup__input-error_active" : ""
          }`}
          id="card-url-error"
        >
          {errors.link}
        </span>
      </label>

      <button
        className={`button popup__button ${
          !isFormValid ? "popup__button_disabled" : ""
        }`}
        type="submit"
        disabled={!isFormValid}
      >
        Crear
      </button>
    </form>
  );
}