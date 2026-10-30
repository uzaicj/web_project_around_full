import { useContext } from "react";

import type { PopupConfig, CardData } from "../../types/types";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Popup from "./Popup/Popup";
import EditAvatar from "./Popup/EditAvatar/EditAvatar";
import EditProfile from "./Popup/EditProfile/EditProfile";
import ImagePopup from "./Popup/ImagePopup/ImagePopup";
import NewCard from "./Popup/NewCard/NewCard";
import RemoveCard from "./Popup/RemoveCard/RemoveCard";

import Card from "./Card/Card";

interface MainProps {
  cards: CardData[];
  handleOpenPopup: (popup: PopupConfig) => void;
  handleClosePopup: () => void;
  popup: PopupConfig | null;
  handleCardLike: (card: CardData) => Promise<void>;
  handleCardDelete: (card: CardData) => Promise<void>;
}

function Main({
  cards,
  handleOpenPopup,
  handleClosePopup,
  popup,
  handleCardLike,
  handleCardDelete,
}: MainProps) {
  const { currentUser } = useContext(CurrentUserContext);

  // POPUP: NUEVA TARJETA
  const newCardPopup: PopupConfig = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  // POPUP: EDITAR PERFIL
  const editProfilePopup: PopupConfig = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  // POPUP: EDITAR AVATAR
  const editAvatarPopup: PopupConfig = {
    title: "Actualizar foto de perfil",
    children: <EditAvatar />,
  };

  // POPUP: IMAGEN
  function createImagePopup(card: CardData): PopupConfig {
    return {
      children: <ImagePopup image={card.link} caption={card.name} />,
    };
  }

  return (
    <main className="content">
      {/* PERFIL */}
      <section className="profile page__section">
        <div className="profile__avatar-wrapper">
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt={currentUser?.name}
          />

          <button
            aria-label="Editar avatar"
            className="profile__avatar-edit-button"
            type="button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser?.name}
          </h1>

          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>

          <p className="profile__description">
            {currentUser?.about}
          </p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      {/* TARJETAS */}
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              
              // Abrir imagen
              onImageClick={(card) =>
                handleOpenPopup(createImagePopup(card))
              }

              // Borrar tarjeta
              onDeleteClick={() => {
                handleOpenPopup({
                  title: "¿Estás seguro?",
                  children: (
                    <RemoveCard
                      card={card}
                      onDelete={handleCardDelete}
                    />
                  ),
                });
              }}

              // Like
              onLikeClick={handleCardLike}
            />
          ))}
        </ul>
      </section>

      {/* POPUP */}
      {popup && (
        <Popup
          title={popup.title}
          isOpen={popup !== null}
          onClose={handleClosePopup}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;