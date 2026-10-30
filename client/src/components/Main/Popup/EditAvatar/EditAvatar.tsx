import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useFormValidation } from "../../../../hooks/useFormValidation";

export default function EditAvatar(): React.JSX.Element {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef<HTMLInputElement>(null);

  const { errors, isFormValid, handleInputValidation } =
  useFormValidation(["avatar"]);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (avatarRef.current) {
      handleUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    }
  };

  return (
    <form
      className="popup__form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_avatar"
        id="avatarLink"
        name="avatar"
        placeholder="Enlace a la imagen"
        type="url"
        ref={avatarRef}
        onChange={handleInputValidation}
        required
      />

      <span
        className={`avatarLink-input-error popup__input-error ${
          errors.avatar ? "popup__input-error_active" : ""
        }`}
      >
        {errors.avatar}
      </span>

      <button
        className="button popup__button"
        type="submit"
        disabled={!isFormValid}
      >
        Guardar
      </button>
    </form>
  );
}