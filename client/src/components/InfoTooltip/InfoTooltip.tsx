
import "./InfoTooltip.css";

interface InfoTooltipProps {
  isOpen: boolean;
  isSuccess: boolean;
  message: string;
  onClose: () => void;
}

function InfoTooltip({
  isOpen,
  isSuccess,
  message,
  onClose,
}: InfoTooltipProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="info-tooltip">
      <div className="info-tooltip__container">
        <button
          className="info-tooltip__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        />

        <div
          className={`info-tooltip__icon ${
            isSuccess
              ? "info-tooltip__icon_success"
              : "info-tooltip__icon_error"
          }`}
        >
          {isSuccess ? "✓" : "×"}
        </div>

        <h2 className="info-tooltip__title">
          {message}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
