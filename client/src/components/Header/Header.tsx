
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

interface HeaderProps {
  userEmail?: string;
  onLogout?: () => void;
  linkTo?: string;
  linkText?: string;
}

function Header({
  userEmail,
  onLogout,
  linkTo,
  linkText,
}: HeaderProps) {
  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />

      <div className="header__user">
        {userEmail && onLogout ? (
          <>
            <p className="header__email">{userEmail}</p>
            <button
              className="header__logout"
              type="button"
              onClick={onLogout}
            >
              Cerrar sesión
            </button>
          </>
        ) : linkTo && linkText ? (
          <Link className="header__logout" to={linkTo}>
            {linkText}
          </Link>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
