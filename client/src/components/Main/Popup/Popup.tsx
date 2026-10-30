type PopupProps = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Popup(props: PopupProps): React.JSX.Element {
  const { title, children, isOpen, onClose } = props;

  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div
        className={`popup__content 
          ${!title ? "popup__content_content_image" : ""}
          ${title === "¿Estás seguro?" ? "popup__content_type_delete-card" : ""}
          `}
      >
        <button
          aria-label="Eliminar tarjeta"
          className="popup__close"
          type="button"
          onClick={onClose}
        />

        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}