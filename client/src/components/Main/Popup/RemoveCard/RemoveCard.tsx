import type { CardData } from "../../../../types/types";

type RemoveCardProps = {
  card: CardData;
  onDelete: (card: CardData) => Promise<void>;
};

export default function RemoveCard({
  card,
  onDelete,
}: RemoveCardProps): React.JSX.Element {
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onDelete(card);
  }

  return (
    <form
      className="popup__form"
      id="delete-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <button className="button popup__button" type="submit">
        Sí
      </button>
    </form>
  );
}