import { useContext } from "react";

import CurrentUserContext from "../../../contexts/CurrentUserContext";
import type { CardData } from "../../../types/types";

type CardProps = {
  card: CardData;
  onImageClick: (card: CardData) => void;
  onDeleteClick: () => void;
  onLikeClick: (card: CardData) => void;
};

export default function Card(props: CardProps): React.JSX.Element {
  const { currentUser } = useContext(CurrentUserContext);

  const { name, link } = props.card;
  const { onImageClick, onDeleteClick, onLikeClick } = props;

  const isOwner = currentUser?._id === props.card.owner;

  const cardLikeButtonClassName = `card__like-button ${
    props.card.isLiked ? "card__like-button_is-active" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onImageClick(props.card)}
      />

      {isOwner && (
        <button
          aria-label="Eliminar tarjeta"
          className="card__delete-button"
          type="button"
          onClick={onDeleteClick}
        ></button>
      )}

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Me gusta"
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => onLikeClick(props.card)}
        ></button>
      </div>
    </li>
  );
}