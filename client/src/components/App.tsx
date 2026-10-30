import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import PublicRoute from "./PublicRoute/PublicRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

import api from "../utils/api";
import { authorize, register as registerUser, checkToken } from "../utils/auth";

import CurrentUserContext from "../contexts/CurrentUserContext";

import type {
  UserData,
  CardData,
  PopupConfig,
  UserFormData,
  AvatarFormData,
  CardFormData,
} from "../types/types";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<PopupConfig | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    isSuccess: false,
    message: "",
    redirectToSignin: false,
  });

  // Validar el token guardado al iniciar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsTokenChecked(true);
      return;
    }

    checkToken(token)
      .then((response) => {
        setIsLoggedIn(true);
        setUserEmail(response.data.email);
      })
      .catch((error) => {
        localStorage.removeItem("jwt");
        console.error(error);
      })
      .finally(() => {
        setIsTokenChecked(true);
      });
  }, []);

  // Cargar el perfil y las tarjetas cuando el usuario inicia sesión
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    (async () => {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);

        setCurrentUser(userData);
        setCards(initialCards);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [isLoggedIn]);

  // Iniciar sesión
  async function handleLogin(email: string, password: string) {
    try {
      const response = await authorize({ email, password });

      localStorage.setItem("jwt", response.token);
      setUserEmail(email);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error);

      setInfoTooltip({
        isOpen: true,
        isSuccess: false,
        message: "No se pudo iniciar sesión. Revisa tus datos.",
        redirectToSignin: false,
      });
    }
  }

  // Cerrar sesión
  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
    setCurrentUser(null);
    setCards([]);
    navigate("/signin");
  }

  // Registrar una cuenta
  async function handleRegister(email: string, password: string) {
    try {
      await registerUser({ email, password });

      setInfoTooltip({
        isOpen: true,
        isSuccess: true,
        message: "¡Correcto! Ya estás registrado.",
        redirectToSignin: true,
      });
    } catch (error) {
      console.error(error);

      setInfoTooltip({
        isOpen: true,
        isSuccess: false,
        message: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        redirectToSignin: false,
      });
    }
  }

  // Cerrar InfoTooltip
  function handleCloseInfoTooltip() {
    const shouldRedirect = infoTooltip.redirectToSignin;

    setInfoTooltip({
      isOpen: false,
      isSuccess: false,
      message: "",
      redirectToSignin: false,
    });

    if (shouldRedirect) {
      navigate("/signin");
    }
  }

  // Dar o quitar "Me gusta"
  const handleCardLike = async (card: CardData) => {
    try {
      const newCard = card.isLiked
        ? await api.unlikeCard(card._id)
        : await api.likeCard(card._id);

      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Borrar tarjeta
  const handleCardDelete = async (card: CardData) => {
    try {
      await api.deleteCard(card._id);

      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id),
      );

      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Actualizar perfil
  const handleUpdateUser = async (data: UserFormData) => {
    try {
      const updatedUser = await api.updateUserInfo(data);

      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Actualizar avatar
  const handleUpdateAvatar = async (data: AvatarFormData) => {
    try {
      const updatedUser = await api.updateAvatar(data);

      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Agregar nuevo lugar
  const handleAddPlaceSubmit = async (data: CardFormData) => {
    try {
      const newCard = await api.addCard(data);

      setCards((state) => [newCard, ...state]);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Abrir popup
  function handleOpenPopup(popup: PopupConfig) {
    setPopup(popup);
  }

  // Cerrar popup
  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <>
        <Routes>
          {/* Rutas protegidas: requieren una sesión válida */}
          <Route
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isTokenChecked={isTokenChecked}
              />
            }
          >
            <Route
              path="/"
              element={
                <div className="page__content">
                  <Header userEmail={userEmail} onLogout={handleLogout} />
                  <Main
                    cards={cards}
                    handleOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                    popup={popup}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                  />
                  <Footer />
                </div>
              }
            />
          </Route>

          {/* Rutas públicas: solo para usuarios sin sesión */}
          <Route
            element={
              <PublicRoute
                isLoggedIn={isLoggedIn}
                isTokenChecked={isTokenChecked}
              />
            }
          >
            <Route
              path="/signin"
              element={
                <div className="page__content">
                  <Login onLogin={handleLogin} />
                </div>
              }
            />

            <Route
              path="/signup"
              element={
                <div className="page__content">
                  <Register onRegister={handleRegister} />
                </div>
              }
            />
          </Route>

          {/* Redirigir rutas desconocidas */}
          <Route
            path="*"
            element={
              !isTokenChecked ? null : (
                <Navigate to={isLoggedIn ? "/" : "/signin"} replace />
              )
            }
          />
        </Routes>

        {/* Mensaje de registro exitoso o fallido */}
        <InfoTooltip
          isOpen={infoTooltip.isOpen}
          isSuccess={infoTooltip.isSuccess}
          message={infoTooltip.message}
          onClose={handleCloseInfoTooltip}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
