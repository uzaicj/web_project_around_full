
import logo from "../../images/logo.svg";

interface HeaderProps {
  userEmail: string;
  onLogout: () => void;
}

function Header({ userEmail, onLogout }: HeaderProps) {
  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />

      <div className="header__user">
        <p className="header__email">{userEmail}</p>
        <button
          className="header__logout"
          type="button"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;
